import React, { useContext } from "react";
import FormCard from "./FormCard";
import classes from "./Form.module.css";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";
import { FormDataContext } from "../../store/FormDataContext";
import checkMark from "../../assets/check-icon.png";
const Form = ({ step }) => {
  const stepsCtx = useContext(StepVisibilityContext);
  const step1IsDone = stepsCtx.stepIsDone.step1;
  const step2IsDone = stepsCtx.stepIsDone.step2;
  const step3IsDone = stepsCtx.stepIsDone.step3;
  const formDataCtx = useContext(FormDataContext);

  const step2VisibilityStyle = !step1IsDone ? classes.disabled : "";
  const step3VisibilityStyle =
    !step1IsDone || !step2IsDone ? classes.disabled : "";

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formDataCtx.formDataState);
  };
  return (
    <form className={classes["form-container"]} onSubmit={submitHandler}>
      <FormCard step="1">
        {step1IsDone && (
          <div className={classes.checkMark}>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
      </FormCard>

      <FormCard step="2" className={step2VisibilityStyle}>
        {step2IsDone && (
          <div className={classes.checkMark}>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
      </FormCard>

      <FormCard step="3" className={step3VisibilityStyle}>
        <button
          type="submit"
          disabled={!step1IsDone || !step2IsDone || !step3IsDone}
        >
          Complete Registration
        </button>
      </FormCard>
    </form>
  );
};
export default Form;
