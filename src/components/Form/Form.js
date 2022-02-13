import React, { useContext } from "react";
import FormCard from "./FormCard";
import classes from "./Form.module.css";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";

const Form = ({ step }) => {
  const stepsCtx = useContext(StepVisibilityContext);
  const step1IsDone = stepsCtx.stepIsDone.step1;
  const step2IsDone = stepsCtx.stepIsDone.step2;
  const step3IsDone = stepsCtx.stepIsDone.step3;
  const step2VisibilityStyle = !step1IsDone ? classes.disabled : "";
  const step3VisibilityStyle = !step1IsDone || !step2IsDone ? classes.disabled : "";

  return (
    <form className={classes["form-container"]}>
      <FormCard step="1" />
      <FormCard step="2" className={step2VisibilityStyle} />
      <FormCard step="3" className={step3VisibilityStyle}/>
    </form>
  );
};
export default Form;
