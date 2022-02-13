import React, { Fragment } from "react";
import { useState, useContext, useEffect } from "react";
import Input from "../UI/Input";
import RadioInput from "../UI/RadioInput";
import classes from "./Step2.module.css";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";
import { FormDataContext } from "../../store/FormDataContext";

const Step2 = () => {
  const [question1Radio, setQuestion1Radio] = useState(null);
  const [question2Radio, setQuestion2Radio] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const stepsCtx = useContext(StepVisibilityContext);
  const [step2InputsIsValid, setStep2InputsIsValid] = useState(false);
  const formDataCtx = useContext(FormDataContext);

  const question1RadioChangHandler = (e) => {
    setQuestion1Radio(e.target.value);
  };

  const question2RadioChangHandler = (e) => {
    setQuestion2Radio(e.target.value);
  };

  const companyNameChangeHandler = (e) => {
    setCompanyName(e.target.value);
  };

  const companyNameIsEmpty = question1Radio === "YES" && companyName === "";
  useEffect(() => {
    if (
      question1Radio === null ||
      question2Radio === null ||
      companyNameIsEmpty
    ) {
      setStep2InputsIsValid(false);
      stepsCtx.context.setStepIsDoneFalse("step2");
    } else {
      setStep2InputsIsValid(true);
      stepsCtx.context.setStepIsDoneTrue("step2");
    }
  }, [step2InputsIsValid, question1Radio, question2Radio, companyNameIsEmpty]);

  useEffect(() => {
    if (companyName === "") {
      formDataCtx.context.updateFormDataStateHandler("step2", {
        question1: question1Radio,
        question2: question2Radio,
      });
    } else {
      formDataCtx.context.updateFormDataStateHandler("step2", {
        question1: question1Radio,
        question2: question2Radio,
        companyName: companyName,
      });
    }
  }, [question1Radio, question2Radio, companyName]);


  
  return (
    <Fragment>
      {/* QUESTION 1 */}
      <div>
        <h3>Would you like your company name on your badge? </h3>
        <div className={classes["question-inputs"]}>
          <RadioInput
            input={{
              id: "question1Yes",
              name: "question1",
              checked: question1Radio === "YES",
              value: "YES",
              onChange: question1RadioChangHandler,
            }}
            label="Yes "
          />
          <RadioInput
            input={{
              id: "question1No",
              name: "question1",
              checked: question1Radio === "NO",
              value: "NO",
              onChange: question1RadioChangHandler,
            }}
            label="No"
          />
        </div>
        {question1Radio === "YES" && (
          <Input
            input={{
              type: "text",
              value: companyName,
              id: "companyName",
              onChange: companyNameChangeHandler,
            }}
            label="Company Name: "
            required
          />
        )}
      </div>
      {/* QUESTION 2 */}
      <div>
        <h3>Will anyone in your group require special accommodations? </h3>
        <div className={classes["question-inputs"]}>
          <RadioInput
            input={{
              id: "question2Yes",
              name: "question2",
              checked: question2Radio === "YES",
              value: "YES",
              onChange: question2RadioChangHandler,
            }}
            label="Yes "
          />
          <RadioInput
            input={{
              id: "question2No",
              name: "question2",
              checked: question2Radio === "NO",
              value: "NO",
              onChange: question2RadioChangHandler,
            }}
            label="No"
          />
        </div>
      </div>
      {step2InputsIsValid ? <p>Yes</p> : <p>No</p>}
    </Fragment>
  );
};

export default Step2;
