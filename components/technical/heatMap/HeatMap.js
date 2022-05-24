import React, { useState, useEffect } from "react";
import style from "./HeatMap.Style";
import { createXScale, createYScale, getLine } from "../../../helpers/d3";
import { isPointInPolygon } from "../../../helpers/polygon";

const HeatMap = ({ className, width, height, plots }) => {
  const [scales, setScales] = useState();
  const [area, setArea] = useState();
  const [verticalTicks, setVerticalTicks] = useState([]);
  const [horizontalTicks, setHorizontalTicks] = useState([]);
  const [xAxisLine, setXAxisLine] = useState();
  const [yAxisLine, setYAxisLine] = useState();

  //set scales
  useEffect(() => {
    if (!plots || !plots.length > 0) return;

    const x = createXScale(
      { min: -180, max: 180 },
      { min: 10, max: width - 10 }
    );

    // TODO: check min value -> -90 or 0 ?
    const y = createYScale(
      { min: -90, max: 90 },
      { min: 10, max: height - 10 }
    );

    const polygon = [
      [30, 0],
      [-30, 0],
      [-30, 90],
      [30, 90],
    ];

    const area = getLine(polygon, x, y);
    setArea(area);

    setScales({ x, y });
  }, [plots, width, height]);

  // set axis ticks
  useEffect(() => {
    if (!scales) return;
    const verticalTicks = [];
    for (let i = -90; i <= 90; i += 10) {
      verticalTicks.push(i);
    }
    setVerticalTicks(verticalTicks);

    const horizontalTicks = [];
    for (let i = -180; i <= 180; i += 10) {
      horizontalTicks.push(i);
    }
    setHorizontalTicks(horizontalTicks);

    const xAxisData = [
      [-180, 0],
      [180, 0],
    ];
    const xAxis = getLine(xAxisData, scales.x, scales.y);

    const yAxisData = [
      [0, -90],
      [0, 90],
    ];
    const yAxis = getLine(yAxisData, scales.x, scales.y);

    setXAxisLine(xAxis);
    setYAxisLine(yAxis);
  }, [scales]);

  return scales ? (
    <div className={className} style={{ width, height }}>
      <svg
        height={height - 20}
        width={width - 20}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g className="horizontal-ticks">
          {horizontalTicks.map((tick, index) => (
            <g key={`${index}-group`}>
              <text
                // writingMode="tb"
                key={`${index}-text`}
                fontSize="12"
                fill="var(--color-text)"
                x={scales.x(tick)}
                y={height / 2 + 20}
              >
                {tick}
              </text>
              <line
                stroke="var(--color-text)"
                key={`${index}-tick`}
                x1={scales.x(tick)}
                x2={scales.x(tick)}
                y2={height / 2 + 5}
                y1={height / 2}
              />
            </g>
          ))}
        </g>
        <g className="vertical-ticks">
          {verticalTicks.map((tick, index) => (
            <g key={`${index}-group`}>
              <text
                key={`${index}-text`}
                fontSize="12"
                fill="var(--color-text)"
                x={width / 2 + 15}
                y={scales.y(tick) + 5}
              >
                {tick}
              </text>
              <line
                stroke="var(--color-text)"
                key={`${index}-tick`}
                x1={width / 2 + 5}
                x2={width / 2}
                y2={scales.y(tick)}
                y1={scales.y(tick)}
              />
            </g>
          ))}
        </g>
        <g className={"axis"}>
          {xAxisLine && yAxisLine && (
            <>
              <path
                d={xAxisLine.path}
                fill="none"
                stroke="var(--color-text)"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              <path
                d={yAxisLine.path}
                fill="none"
                stroke="var(--color-text)"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </>
          )}
        </g>
        <g className={"legend"}>
          <text
            fontSize="12"
            fill="var(--color-text)"
            x={width / 2 + 15}
            y={30}
          >
            elevation
          </text>
          <text
            fontSize="12"
            fill="var(--color-text)"
            x={20}
            y={height / 2 - 20}
          >
            azimuth
          </text>
        </g>
        {area && (
          <path d={area.path} fill="var(--color-primary)" fillOpacity="0.3" />
        )}
        {plots &&
          plots.length > 0 &&
          plots.map((plot, index) => (
            <circle
              key={index}
              r={"2"}
              cx={scales.x(plot[0])}
              cy={scales.y(plot[1])}
              fill={"var(--color-primary)"}
              opacity={0.3}
            />
          ))}
      </svg>
    </div>
  ) : null;
};

export default style(HeatMap);
