import React from "react";
import "./CheckMark.css";
import checkMark from "./check-icon.png";
import { CSSTransition } from "react-transition-group";

const animationTiming = {
  enter: 400,
  exit: 500,
};
const CheckMark = ({ steps }) => {
  return (
    <CSSTransition
      in={steps}
      timeout={animationTiming}
      classNames="check-mark-slide"
      mountOnEnter
      unmountOnExit
    >
      <div className="checkMark">
        <img src={checkMark} alt="checkMarkIcon" />
      </div>
    </CSSTransition>
  );
};

export default CheckMark;
