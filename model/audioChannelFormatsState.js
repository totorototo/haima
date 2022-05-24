import { selectorFamily } from "recoil";

import { admState } from "./index";

const audioChannelFormatsState = selectorFamily({
  key: "audioChannelFormats",
  get:
    (ids = []) =>
    ({ get }) => {
      const model = get(admState);
      if (!model) return undefined;

      return ids
        .map((id) => {
          return model.audioChannelFormats.find(
            (elem) => elem.audioChannelFormatID === id
          );
        })
        .filter((audioObject) => audioObject !== undefined);
    },
});

export default audioChannelFormatsState;
