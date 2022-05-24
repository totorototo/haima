import { selector } from "recoil";
import {
  audioChannelFormatsState,
  audioContentsState,
  audioObjectsState,
  audioPackFormatState,
  audioProgrammeState,
} from "./index";

// audioProgramme (1) -> audioContent (n) -> audioObject (n) -> audioPackFormat (1) -> audioChannelFormat (n) -> audioBlockFormat (n)
const audioObjectsPositionsState = selector({
  key: "audioObjectsPositions",
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

    // flatten sources arrays
    return audioContents.reduce((accu, audioContent) => {
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
              return accu;
            } else {
              const positions = audioChannelFormat.audioBlockFormats.map(
                (audioBlockFormat) => {
                  return [
                    audioBlockFormat.position.x,
                    audioBlockFormat.position.y,
                    audioBlockFormat.position.z,
                  ];
                }
              );

              return [...accu, ...positions];
            }
          },
          []
        );

        return [...accu, ...audioObjectDetails];
      }, []);

      return [...accu, ...audioObjectStates];
    }, []);
  },
});

export default audioObjectsPositionsState;
