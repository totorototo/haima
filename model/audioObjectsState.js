import { selectorFamily } from "recoil";

import { admState } from "./index";

const audioObjectsState = selectorFamily({
  key: "audioObjects",
  get:
    (ids = []) =>
    ({ get }) => {
      const model = get(admState);
      if (!model) return undefined;

      return ids
        .map((id) => {
          return model.audioObjects.find((elem) => elem.audioObjectID === id);
        })
        .filter((audioObject) => audioObject !== undefined);
    },
});

export default audioObjectsState;
