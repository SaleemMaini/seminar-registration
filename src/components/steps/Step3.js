import React, { Fragment, useState, useContext, useEffect } from "react";
import Input from "../UI/Input";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";

const Step3 = () => {
  const [step3CheckBoxIsChecked, setStep3CheckBoxIsChecked] = useState(false);
  const stepsCtx = useContext(StepVisibilityContext);

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
