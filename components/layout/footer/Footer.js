import React from "react";
import style from "./Footer.Style";

const Footer = ({ className }) => {
  return (
    <div className={className}>
      <div className={"conditions"}>
        <div className={"logo"}>ideaquest © 2022</div>
      </div>
    </div>
  );
};

export default style(Footer);
