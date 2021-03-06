import style from "./Stats.Style";
import { useRecoilValue } from "recoil";
import { statsState } from "../../../model";
import { RadialProgressBar } from "../../common";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Stats = ({ className, width, height }) => {
  const {
    score,
    details: {
      duration,
      distance,
      objectCount,
      positionCount,
      positionInsideAreaPercent,
      movementByMs,
    },
  } = useRecoilValue(statsState);

  return (
    <div style={{ width, height }} className={className}>
      <div className={"title"}>{"stats"}</div>
      <p>
        <span className={"category"}>overall score</span>
        {score && (
          <span className={"score"}>
            <span>{`score: ${score.toFixed(2)}`}</span>
          </span>
        )}
      </p>
      <p>
        <span className={"category"}>score details</span>
        {duration && <span>{`duration: ${duration}`}</span>}
        {objectCount && <span>{`audio object count: ${objectCount}`}</span>}
        {positionCount && (
          <span>{`audio objects positions count: ${positionCount}`}</span>
        )}

        {distance && (
          <span>{`total distance completed: ${distance.toFixed(2)}`}</span>
        )}
        {positionInsideAreaPercent && (
          <span>{`positions inside specific area percent: ${positionInsideAreaPercent.toFixed(
            2
          )}%`}</span>
        )}
        {movementByMs && (
          <span>{`positions updates by second: ${(movementByMs * 1000).toFixed(
            2
          )} `}</span>
        )}
      </p>
      <RadialProgressBar
        data={[
          {
            label: "object count",
            percent: (100 * objectCount) / 218,
            color: "var(--color-primary)",
          },
          {
            label: "distance",
            percent: (100 * distance) / 5000,
            color: "var(--syntax-val)",
          },
          {
            label: "directivity",
            percent: 100 - positionInsideAreaPercent.toFixed(2),
            color: "var(--syntax-txt)",
          },
          {
            label: "velocity",
            percent: getRandomInt(40, 60),
            color: "var(--syntax-regex)",
          },
        ]}
      />
    </div>
  );
};

export default style(Stats);
