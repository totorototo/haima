import { selector } from "recoil";

import {
  audioChannelFormatsState,
  audioContentsState,
  audioObjectsPositionsState,
  audioObjectsState,
  audioPackFormatState,
  audioProgrammeState,
} from "./index";
import { formatDistanceStrict } from "date-fns";
import { convertDurationToMs } from "../helpers/time";
import { isPointInPolygon } from "../helpers/polygon";

const computeDistance = (origin = [0, 0, 0], destination = [0, 0, 0]) => {
  return Math.sqrt(
    Math.pow(destination[0] - origin[0], 2) +
      Math.pow(destination[1] - origin[1], 2) +
      Math.pow(destination[2] - origin[1], 2)
  );
};

const REFERENCES = {
  audioObjectsCount: {
    value: 118,
    weight: 0.2,
  },
  distance: {
    value: 10000,
    weight: 0.2,
  },
  averagePositions: {
    value: 100,
    weight: 0.2,
  },
  positionsInsideArea: {
    weight: 0.4,
  },
};

const computeScore = (
  stats = {
    duration,
    distance,
    objectCount,
    positionCount,
    positionInsideAreaPercent,
    movementByMs,
  }
) => {
  // 1- object count
  // 2- distance completed
  // 3- positions inside +/- 30°
  // 4- positions count / programme duration

  const audioObjectCountScore =
    (100 * stats.objectCount) / REFERENCES.audioObjectsCount.value;

  const distanceScore = (100 * stats.distance) / REFERENCES.distance.value;

  const directivityScore = stats.positionInsideAreaPercent;

  const averagePositionsScore =
    (100 * (stats.positionCount / stats.duration)) /
    REFERENCES.averagePositions.value;

  const score =
    audioObjectCountScore * REFERENCES.audioObjectsCount.weight +
    distanceScore * REFERENCES.distance.weight +
    directivityScore * REFERENCES.positionsInsideArea.weight +
    averagePositionsScore * REFERENCES.positionsInsideArea.weight;

  debugger;
  return score;
};

const statsState = selector({
  key: "stats",
  get: ({ get }) => {
    const audioProgramme = get(audioProgrammeState);

    // no audioProgramme
    if (!audioProgramme) return [];

    //2- get audioContents
    const audioContentIDRefs = audioProgramme.audioContentIDRefs;
    const audioContents = get(audioContentsState(audioContentIDRefs));

    // no audioContents
    if (!audioContents || !audioContents.length > 0) return [];

    //3- get audioObjects
    const audioContentsStats = audioContents.reduce((accu, audioContent) => {
      const audioContentName = audioContent.audioContentName;
      const audioObjectIDRefs = audioContent.audioObjectIDRefs;
      const audioObjects = get(audioObjectsState(audioObjectIDRefs));

      const audioObjectsStats = audioObjects.reduce((accu, audioObject) => {
        const audioObjectName = audioObject.audioObjectName;
        const start = audioObject.start;
        const duration = audioObject.duration;

        // TODO: compute distance for that given object
        const audioPackFormatIDRef = audioObject.audioPackFormatIDRef;
        const audioPackFormat = get(audioPackFormatState(audioPackFormatIDRef));
        if (!audioPackFormat) {
          return [...accu, { audioObjectName, start, duration }];
        }

        //5- get audioChannelFormats
        const audioChannelFormatIDRefs =
          audioPackFormat.audioChannelFormatIDRefs;

        const audioChannelFormats = get(
          audioChannelFormatsState(audioChannelFormatIDRefs)
        );

        if (!audioChannelFormats || !audioChannelFormats.length > 0) {
          return [...accu, { audioObjectName, start, duration }];
        }

        const audioChannelFormatsStats = audioChannelFormats.reduce(
          (accu, audioChannelFormat) => {
            const positions = audioChannelFormat.audioBlockFormats.map(
              (audioBlockFormat) => {
                return [
                  audioBlockFormat.position.x,
                  audioBlockFormat.position.z,
                  audioBlockFormat.position.y,
                ];
              }
            );
            return [
              ...accu,
              {
                positions,
                typeDefinition: audioChannelFormat.typeDefinition,
              },
            ];
          },
          []
        );

        const stats = {
          audioObjectName,
          start,
          duration,
          audioChannelFormatsStats,
        };
        return [...accu, stats];
      }, []);

      const audioContentStats = {
        audioContentName,
        audioObjectsStats,
      };

      return [...accu, audioContentStats];
    }, []);

    const name = audioProgramme.name;
    const start = convertDurationToMs(audioProgramme.start);
    const end = convertDurationToMs(audioProgramme.end);
    const timeSpan = end - start;
    const duration = formatDistanceStrict(0, timeSpan, {
      unit: "second",
    });

    const positions = get(audioObjectsPositionsState);

    const polygon = [
      [30, 0],
      [-30, 0],
      [-30, 90],
      [30, 90],
    ];

    const positionsInsideArea = positions
      .map((plot) => isPointInPolygon(plot, polygon))
      .filter((inside) => inside === true);

    const positionInsideAreaPercent =
      (positionsInsideArea.length * 100) / positions.length;

    // calculate distance done by all audio objects
    const distance = audioContentsStats.reduce((accu, audioContentsStat) => {
      const distance = audioContentsStat.audioObjectsStats.reduce(
        (accu, audioObjectStat) => {
          const distance = audioObjectStat.audioChannelFormatsStats.reduce(
            (accu, audioChannelFormatsStat) => {
              const distance = audioChannelFormatsStat.positions.reduce(
                (accu, position, index, array) => {
                  if (index > 0) {
                    const origin = array[index - 1];
                    const distance = computeDistance(origin, position);
                    return accu + distance;
                  }
                  return accu;
                },
                0
              );

              return accu + distance;
            },
            0
          );

          return accu + distance;
        },
        0
      );

      return accu + distance;
    }, 0);

    // // compute ratio object duration sum / audio programme duration
    // const audioObjectsDuration = audioContentsStats.reduce(
    //   (accu, audioContentsStat) => {
    //     const duration = audioContentsStat.audioObjectsStats.reduce(
    //       (accu, audioContentsStat) => {
    //         return accu + convertDurationToMs(audioContentsStat.duration);
    //       },
    //       0
    //     );
    //     return accu + duration;
    //   },
    //   0
    // );

    // // audio objects duration sum / audio programme duration
    // const ratio = audioObjectsDuration / duration;

    // get audio objects count
    const audioObjectsCount = audioContentsStats.reduce(
      (accu, audioContentsStat) => {
        const count = audioContentsStat.audioObjectsStats.length;
        return accu + count;
      },
      0
    );

    const score = computeScore({
      duration: timeSpan,
      distance,
      objectCount: audioObjectsCount,
      positionCount: positions.length,
      positionInsideAreaPercent,
      movementByMs: positions.length / timeSpan,
    });

    //console.log(score);

    return {
      score,
      details: {
        name,
        duration,
        distance,
        objectCount: audioObjectsCount,
        positionCount: positions.length,
        positionInsideAreaPercent,
        movementByMs: positions.length / timeSpan,
      },
    };
  },
  default: { score: 0, details: { distance: 0 } },
});

export default statsState;
