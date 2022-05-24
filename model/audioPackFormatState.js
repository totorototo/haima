import { selectorFamily } from "recoil";

import { admState } from "./index";

const audioPackFormatState = selectorFamily({
  key: "audioPackFormat",
  get:
    (id) =>
    ({ get }) => {
      const model = get(admState);
      if (!model) return undefined;

      return model.audioPackFormats.find(
        (elem) => elem.audioPackFormatID === id
      );
    },
});

export default audioPackFormatState;
