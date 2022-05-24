import Formidable from "formidable-serverless";
import fs from "fs";
import { transform } from "camaro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const template = {
  audioProgramme: {
    id: "ebuCoreMain/coreMetadata/format/audioFormatExtended/audioProgramme/@audioProgrammeID",
    name: "ebuCoreMain/coreMetadata/format/audioFormatExtended/audioProgramme/@audioProgrammeName",
    start:
      "ebuCoreMain/coreMetadata/format/audioFormatExtended/audioProgramme/@start",
    end: "ebuCoreMain/coreMetadata/format/audioFormatExtended/audioProgramme/@end",
    audioContentIDRefs: [
      "ebuCoreMain/coreMetadata/format/audioFormatExtended/audioProgramme/audioContentIDRef",
      ".",
    ],
  },
  audioContents: [
    "//audioContent",
    {
      audioContentID: "@audioContentID",
      audioContentName: "@audioContentName",
      audioObjectIDRefs: ["audioObjectIDRef", "."],
    },
  ],
  audioPackFormats: [
    "//audioPackFormat",
    {
      audioPackFormatID: "@audioPackFormatID",
      audioPackFormatName: "@audioPackFormatName",
      typeDefinition: "@typeDefinition",
      typeLabel: "@typeLabel",
      audioChannelFormatIDRefs: ["audioChannelFormatIDRef", "."],
    },
  ],
  audioChannelFormats: [
    "//audioChannelFormat",
    {
      audioChannelFormatID: "@audioChannelFormatID",
      audioChannelFormatName: "@audioChannelFormatName",
      typeDefinition: "@typeDefinition",
      typeLabel: "@typeLabel",
      audioBlockFormats: [
        "audioBlockFormat",
        {
          rtime: "@rtime",
          duration: "@duration",
          audioBlockFormatID: "@audioBlockFormatID",
          speakerLabel: "speakerLabel",
          cartesian: 'boolean(cartesian = "1")',
          position: {
            x: 'number(position[@coordinate="X"])',
            y: 'number(position[@coordinate="Y"])',
            z: 'number(position[@coordinate="Z"])',
          },
          jumpPosition: {
            interpolationLength: "jumpPosition/@interpolationLength",
            count: "jumpPosition",
          },
        },
      ],
    },
  ],
  audioObjects: [
    "//audioObject",
    {
      audioObjectID: "@audioObjectID",
      audioObjectName: "@audioObjectName",
      start: "@start",
      duration: "@duration",
      audioPackFormatIDRef: "audioPackFormatIDRef",
      audioTrackUIDRefs: ["audioTrackUIDRef", "."],
    },
  ],
  audioStreamFormats: [
    "//audioStreamFormat",
    {
      audioStreamFormatID: "@audioStreamFormatID",
      audioStreamFormatName: "@audioStreamFormatName",
      formatDefinition: "@formatDefinition",
      formatLabel: "@formatLabel",
      audioChannelFormatIDRef: "audioChannelFormatIDRef",
      audioPackFormatIDRef: "audioPackFormatIDRef",
      audioTrackFormatIDRef: "audioTrackFormatIDRef",
    },
  ],
  audioTrackFormats: [
    "//audioTrackFormat",
    {
      audioTrackFormatID: "@audioTrackFormatID",
      audioTrackFormatName: "@audioTrackFormatName",
      formatDefinition: "@formatDefinition",
      formatLabel: "@formatLabel",
      audioStreamFormatID: "audioStreamFormatIDRef",
    },
  ],
  audioTrackUIDs: [
    "//audioTrackUID",
    {
      uid: "@UID",
      bitDepth: "@bitDepth",
      sampleRate: "@sampleRate",
      audioTrackFormatID: "audioTrackFormatIDRef",
      audioPackFormatID: "audioPackFormatIDRef",
    },
  ],
};

export default function uploadFormFiles(req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async function (err, fields, files) {
      if (err) {
        resolve(res.status(500).send({ message: "oops" }));
        return;
      }

      const jsons = await Object.entries(files).reduce(
        async (accu, [key, value]) => {
          const xml = fs.readFileSync(value.path, { encoding: "utf-8" });
          const json = await transform(xml, template);
          return [...accu, json];
        },
        []
      );

      if (res) {
        resolve(res.status(200).send({ data: jsons[0] }));
      } else {
        resolve(res.status(500).send({ message: "oops" }));
      }
    });
  });
}
