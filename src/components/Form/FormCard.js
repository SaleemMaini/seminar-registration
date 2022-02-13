import React from "react";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import classes from "./FormCard.module.css";

const FormCard = ({ step, className, children }) => {
  return (
    <div className={`${classes["form-card"]} ${className}`}>
      <span className={classes["form-card-header"]}>Step {step}</span>
      <div className={classes["form-card-content"]}>
        {step === "1" ? (
          <Step1  />
        ) : step === "2" ? (
          <Step2 />
        ) : step === "3" ? (
          <Step3 />
        ) : (
          "NO STEP NUMBER PROVIDED"
        )}
        {children}
      </div>
    </div>
  );
};

export default FormCard;
