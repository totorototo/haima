import React from "react";
import style from "./Main.Style";

const Main = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default style(Main);
