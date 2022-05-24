import { selectorFamily } from "recoil";

import { admState } from "./index";

const audioContentsState = selectorFamily({
  key: "audioContentsState",
  get:
    (ids) =>
    ({ get }) => {
      const model = get(admState);
      if (!model) return undefined;

      return ids
        .map((id) => {
          return model.audioContents.find((elem) => elem.audioContentID === id);
        })
        .filter((audioContent) => audioContent !== undefined);
    },
});

export default audioContentsState;
