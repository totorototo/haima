import { selector } from "recoil";
import { admState } from "./index";

const audioProgrammeState = selector({
  key: "audioProgrammeState",
  get: ({ get }) => {
    const model = get(admState);
    if (!model) return undefined;

    const audioProgrammes = Object.values(model);
    return audioProgrammes.length > 0 ? audioProgrammes[0] : undefined;
  },
});

export default audioProgrammeState;
