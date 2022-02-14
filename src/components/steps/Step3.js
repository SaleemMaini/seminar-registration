import React, { Fragment, useContext, useEffect } from "react";
import Input from "../UI/Input";
import { FormDataContext } from "../../store/FormDataContext";

const Step3 = () => {
  const formDataCtx = useContext(FormDataContext);
  const step3CheckBoxIsCheckedCtx =
    formDataCtx.formDataState.step3.step3CheckBoxIsChecked;

  const step3CheckBoxChangeHandler = (e) => {
    formDataCtx.context.updateFormDataStateHandler("step3", {
      step3CheckBoxIsChecked: e.target.checked,
    });
  };

  useEffect(() => {
    if (step3CheckBoxIsCheckedCtx) {
      formDataCtx.context.updateFormDataStateHandler("step3IsDone", true);
    } else {
      formDataCtx.context.updateFormDataStateHandler("step3IsDone", false);
    }
  }, [step3CheckBoxIsCheckedCtx]);

  return (
    <Fragment>
      <Input
        input={{
          id: "step3CheckBox",
          type: "checkbox",
          checked: step3CheckBoxIsCheckedCtx === true,
          onChange: step3CheckBoxChangeHandler,
        }}
        label="Are you ready to rock? "
      />
    </Fragment>
  );
};

export default Step3;
