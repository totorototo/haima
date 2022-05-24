import { selector } from "recoil";
import { convertDurationToMs } from "../helpers/time";
import {
  audioChannelFormatsState,
  audioContentsState,
  audioObjectsState,
  audioPackFormatState,
  audioProgrammeState,
} from "./index";

// audioProgramme (1) -> audioContent (n) -> audioObject (n) -> audioPackFormat (1) -> audioChannelFormat (n) -> audioBlockFormat (n)
const sceneState = selector({
  key: "scene",
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
    const sources = audioContents.reduce((accu, audioContent) => {
      const audioObjectIDRefs = audioContent.audioObjectIDRefs;
      const audioObjects = get(audioObjectsState(audioObjectIDRefs));

      // no audioObjects
      if (!audioObjects || !audioObjects.length > 0) return accu;

      //4- get audioPackFormats
      const audioObjectStates = audioObjects.reduce((accu, audioObject) => {
        const audioPackFormatIDRef = audioObject.audioPackFormatIDRef;
        const audioPackFormat = get(audioPackFormatState(audioPackFormatIDRef));
        if (!audioPackFormat) return accu;

        //5- get audioChannelFormats
        const audioChannelFormatIDRefs =
          audioPackFormat.audioChannelFormatIDRefs;

        const audioChannelFormats = get(
          audioChannelFormatsState(audioChannelFormatIDRefs)
        );

        if (!audioChannelFormats || !audioChannelFormats.length > 0)
          return accu;

        const audioObjectDetails = audioChannelFormats.reduce(
          (accu, audioChannelFormat) => {
            if (audioChannelFormat.typeDefinition === "DirectSpeakers") {
              const steps = audioChannelFormat.audioBlockFormats.map(
                (audioBlockFormat) => {
                  const position = [
                    audioBlockFormat.position.x,
                    audioBlockFormat.position.z,
                    -audioBlockFormat.position.y,
                  ];

                  return {
                    position,
                  };
                }
              );

              const details = {
                definition: audioChannelFormat.typeDefinition,
                id: audioChannelFormat.audioChannelFormatID,
                name: audioChannelFormat.audioChannelFormatID,
                label: audioChannelFormat.typeLabel,
                steps,
                color: "blue",
              };

              return [...accu, details];
            } else {
              const audioBlockFormatOffSet = convertDurationToMs(
                audioObject.start
              );

              const steps = audioChannelFormat.audioBlockFormats.map(
                (audioBlockFormat) => {
                  const position = [
                    audioBlockFormat.position.x,
                    audioBlockFormat.position.z,
                    -audioBlockFormat.position.y,
                  ];

                  return {
                    position,
                    startTime:
                      audioBlockFormatOffSet +
                      convertDurationToMs(audioBlockFormat.rtime),
                    duration: convertDurationToMs(audioBlockFormat.duration),
                  };
                }
              );

              const details = {
                definition: audioChannelFormat.typeDefinition,
                id: audioChannelFormat.audioChannelFormatID,
                name: audioChannelFormat.audioChannelFormatID,
                label: audioChannelFormat.typeLabel,
                steps,
                color: "#651fff",
              };

              return [...accu, details];
            }
          },
          []
        );

        return [...accu, audioObjectDetails];
      }, []);

      return [...accu, audioObjectStates];
    }, []);

    // flatten sources arrays
    return sources.flat(2);
  },
});

export default sceneState;
