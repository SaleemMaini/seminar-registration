import React, { Fragment } from "react";
import { useContext } from "react";
import Input from "../UI/Input";
import RadioInput from "../UI/RadioInput";
import { FormDataContext } from "../../store/FormDataContext";
import { CSSTransition } from "react-transition-group";
import "./Steps.css";

const Step2 = () => {
  const formDataCtx = useContext(FormDataContext);
  const question1StateCtx = formDataCtx.formDataState.step2.question1;
  const question2StateCtx = formDataCtx.formDataState.step2.question2;
  const companyNameStateCtx = formDataCtx.formDataState.step2.companyName;

  const question1RadioChangHandler = (e) => {
    formDataCtx.context.updateFormDataStateHandler("step2", {
      question1: e.target.value,
      question2: question2StateCtx,
      companyName: companyNameStateCtx,
    });
  };

  const question2RadioChangHandler = (e) => {
    formDataCtx.context.updateFormDataStateHandler("step2", {
      question1: question1StateCtx,
      question2: e.target.value,
      companyName: companyNameStateCtx,
    });
  };

  const companyNameChangeHandler = (e) => {
    formDataCtx.context.updateFormDataStateHandler("step2", {
      question1: question1StateCtx,
      question2: question2StateCtx,
      companyName: e.target.value,
    });
  };

  return (
    <Fragment>
      {/* QUESTION 1 */}
      <div>
        <h3>Would you like your company name on your badge? </h3>
        <div style={{ marginTop: "10px", fontSize: "20px" }}>
          <RadioInput
            input={{
              id: "question1Yes",
              name: "question1",
              checked: question1StateCtx === "YES",
              value: "YES",
              onChange: question1RadioChangHandler,
            }}
            label="Yes "
          />
          <RadioInput
            input={{
              id: "question1No",
              name: "question1",
              checked: question1StateCtx === "NO",
              value: "NO",
              onChange: question1RadioChangHandler,
            }}
            label="No"
          />
        </div>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={question1StateCtx === "YES"}
          timeout={300}
          classNames="slide"
        >
          <Input
            input={{
              type: "text",
              value: companyNameStateCtx,
              id: "companyName",
              onChange: companyNameChangeHandler,
            }}
            label="Company Name: "
            required
          />
        </CSSTransition>
      </div>
      {/* QUESTION 2 */}
      <div>
        <h3>Will anyone in your group require special accommodations? </h3>
        <div style={{ marginTop: "10px", fontSize: "20px" }}>
          <RadioInput
            input={{
              id: "question2Yes",
              name: "question2",
              checked: question2StateCtx === "YES",
              value: "YES",
              onChange: question2RadioChangHandler,
            }}
            label="Yes "
          />
          <RadioInput
            input={{
              id: "question2No",
              name: "question2",
              checked: question2StateCtx === "NO",
              value: "NO",
              onChange: question2RadioChangHandler,
            }}
            label="No"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Step2;
