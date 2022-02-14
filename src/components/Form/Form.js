import React, { useContext, useState, useEffect } from "react";
import FormCard from "./FormCard";
import classes from "./Form.module.css";
import { FormDataContext } from "../../store/FormDataContext";
import checkMark from "../../assets/check-icon.png";

const Form = ({ step }) => {
  const formDataCtx = useContext(FormDataContext);
  const step1IsDoneCtx = formDataCtx.formDataState.step1IsDone;
  const step2IsDoneCtx = formDataCtx.formDataState.step2IsDone;
  const step3IsDoneCtx = formDataCtx.formDataState.step3IsDone;

  const [step2VisibilityStyle, setStep2VisibilityStyle] = useState("");
  const [step3VisibilityStyle, setStep3VisibilityStyle] = useState("");

  useEffect(() => {
    if (!step1IsDoneCtx) {
      setStep2VisibilityStyle(classes.disabled);
    } else if (step1IsDoneCtx) {
      setStep2VisibilityStyle("");
    }

    if (!step1IsDoneCtx || !step2IsDoneCtx) {
      setStep3VisibilityStyle(classes.disabled);
    } else if (step1IsDoneCtx && step2IsDoneCtx) {
      setStep3VisibilityStyle("");
    }
  }, [step1IsDoneCtx, step2IsDoneCtx]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formDataCtx.formDataState);
    formDataCtx.context.resetFormDataStateHandler();
  };
  
  return (
    <form className={classes["form-container"]} onSubmit={submitHandler}>
      <FormCard step="1">
        {step1IsDoneCtx && (
          <div className={classes.checkMark}>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
        
      </FormCard>

      <FormCard step="2" className={step2VisibilityStyle}>
        {step2IsDoneCtx && (
          <div className={classes.checkMark}>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
      </FormCard>

      <FormCard step="3" className={step3VisibilityStyle}>
        <button
          type="submit"
          disabled={!step1IsDoneCtx || !step2IsDoneCtx || !step3IsDoneCtx}
        >
          Complete Registration
        </button>
      </FormCard>
    </form>
  );
};
export default Form;
