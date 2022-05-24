import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { audioObjectsPositionsState } from "../../../model";
import style from "./HeatMaps.Style";
import { HeatMap } from "../../technical";
import { AutoSizer } from "react-virtualized";
import { convertCartesianToPolar } from "../../../helpers/trigonometry";

const HeatMaps = ({ className }) => {
  const [plots, setPlots] = useState();
  const audioObjectsPositions = useRecoilValue(audioObjectsPositionsState);

  useEffect(() => {
    const plots = audioObjectsPositions.map((position) => {
      const { elevation, azimuth } = convertCartesianToPolar(position);
      return [azimuth, elevation];
    });

    setPlots(plots);
  }, [audioObjectsPositions]);

  return (
    <div className={className}>
      <div className={"title"}>heat maps</div>

      <div className={"heatmap-container"}>
        <AutoSizer>
          {({ width, height }) => (
            <HeatMap width={width} height={height} plots={plots} />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default style(HeatMaps);
