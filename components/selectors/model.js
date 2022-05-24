// audioProgramme (1) -> audioContent (n) -> audioObject (n) -> audioPackFormat (1) -> audioChannelFormat (n) -> audioBlockFormat (n)

export const getAudioProgramme = (model) => {
  const audioProgrammes = Object.values(model);
  return audioProgrammes.length > 0 ? audioProgrammes[0] : undefined;
};

export const getAudioContents = (model, ids = []) => {
  return ids
    .map((id) => {
      return model.audioContents.find((elem) => elem.audioContentID === id);
    })
    .filter((audioContent) => audioContent !== undefined);
};

export const getAudioObjects = (model, ids = []) => {
  return ids
    .map((id) => {
      return model.audioObjects.find((elem) => elem.audioObjectID === id);
    })
    .filter((audioObject) => audioObject !== undefined);
};

export const getAudioPackFormat = (model, id) => {
  return model.audioPackFormats.find((elem) => elem.audioPackFormatID === id);
};

export const getAudioChannelFormats = (model, ids = []) => {
  return ids
    .map((id) => {
      return model.audioChannelFormats.find(
        (elem) => elem.audioChannelFormatID === id
      );
    })
    .filter((audioObject) => audioObject !== undefined);
};
