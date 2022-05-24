import style from "./Graphs.Style";
import { useEffect, useState } from "react";
import {
  getAudioChannelFormats,
  getAudioPackFormat,
  getAudioProgramme,
} from "../../selectors/model";
import { convertDurationToMs } from "../../../helpers/time";
import { createXScale } from "../../../helpers/d3";

const Graphs = ({ className, width, height, model }) => {
  const [scales, setScales] = useState({});
  const [spans, setSpans] = useState([]);

  useEffect(() => {
    if (!model || !scales.x) return;

    //FIXME: temp
    const audioObjects = model.audioObjects;
    console.log("ao: " + audioObjects.length);
    const audioObjectSpans = audioObjects.map((audioObject, index) => {
      const width = scales.x(convertDurationToMs(audioObject.duration));
      const x = scales.x(convertDurationToMs(audioObject.start));

      const audioObjectSpan = {
        x,
        width,
        audioChannelFormatsSpans: [],
      };

      const audioPackFormat = getAudioPackFormat(
        model,
        audioObject.audioPackFormatIDRef
      );

      if (audioPackFormat) {
        const audioChannelFormats = getAudioChannelFormats(
          model,
          audioPackFormat.audioChannelFormatIDRefs
        );
        if (audioChannelFormats && audioChannelFormats.length > 0) {
          audioObjectSpan.audioChannelFormatsSpans = audioChannelFormats
            .filter((element) => element.typeDefinition !== "DirectSpeakers")
            .reduce((accu, audioChannelFormat) => {
              const audioBlockFormatOffSet = convertDurationToMs(
                audioObject.start
              );

              const audioChannelFormatSpans =
                audioChannelFormat.audioBlockFormats.map((audioBlockFormat) => {
                  return {
                    x: scales.x(
                      audioBlockFormatOffSet +
                        convertDurationToMs(audioBlockFormat.rtime)
                    ),
                    width: scales.x(
                      convertDurationToMs(audioBlockFormat.duration)
                    ),
                  };
                });

              return [...accu, ...audioChannelFormatSpans];
            }, []);
        }
      }

      return audioObjectSpan;
    });

    console.log("aos:" + audioObjectSpans.length);
    setSpans(audioObjectSpans);
  }, [model, scales]);

  // compute scale(s)
  useEffect(() => {
    if (!model) return;

    const audioProgramme = getAudioProgramme(model);

    const end =
      convertDurationToMs(audioProgramme.end) -
      convertDurationToMs(audioProgramme.start);

    const x = createXScale(
      {
        min: 0,
        max: end,
      },
      { min: 0, max: width }
    );

    //FIXME: y scale ?
    setScales({ x });
  }, [model, width]);

  return (
    <div style={{ width, height }} className={className}>
      <div className={"title"}>time lines</div>
      <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        {spans.map((span, index) => {
          return (
            <g key={index}>
              <rect
                x={span.x}
                y={index * 6 * 2}
                width={span.width}
                height={6 / 2}
                fill={"var(--syntax-text)"}
                fillOpacity={0.8}
              />
              {span.audioChannelFormatsSpans.map((span, index) => {
                return (
                  <rect
                    key={index}
                    x={span.x}
                    y={index * 6 * 2 + 6}
                    width={span.width}
                    height={6 / 2}
                    fill={"var(--syntax-name)"}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default style(Graphs);
