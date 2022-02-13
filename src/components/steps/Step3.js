import React, { Fragment, useState, useContext, useEffect } from "react";
import Input from "../UI/Input";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";
import { FormDataContext } from "../../store/FormDataContext";

const Step3 = () => {
  const [step3CheckBoxIsChecked, setStep3CheckBoxIsChecked] = useState(false);
  const stepsCtx = useContext(StepVisibilityContext);
  const formDataCtx = useContext(FormDataContext);

  const step3CheckBoxChangeHandler = (e) => {
    setStep3CheckBoxIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (step3CheckBoxIsChecked) {
      stepsCtx.context.setStepIsDoneTrue("step3");
    } else {
      stepsCtx.context.setStepIsDoneFalse("step3");
    }
  }, [step3CheckBoxIsChecked]);

  useEffect(() => {
    formDataCtx.context.updateFormDataStateHandler("step3", {
      step3CheckBoxIsChecked: step3CheckBoxIsChecked,
    });
  }, [step3CheckBoxIsChecked]);

  return (
    <Fragment>
      <Input
        input={{
          id: "step3CheckBox",
          type: "checkbox",
          checked: step3CheckBoxIsChecked,
          onChange: step3CheckBoxChangeHandler,
        }}
        label="Are you ready to rock? "
      />
    </Fragment>
  );
};

export default Step3;
