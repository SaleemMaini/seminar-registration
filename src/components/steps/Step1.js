import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { StepVisibilityContext } from "../../store/StepVisibilityContextProvider";
import { FormDataContext } from "../../store/FormDataContext";

const Step1 = (props) => {
  const peopleCountOptions = [ 1, 2, 3, 4, 5]; // IF YOU WANT MORE OPTIONS JUST ADD ITEMS TO THE ARRAY HERE
  const selectPeopleCountRef = useRef();
  const [step1IsDone, setStep1IsDone] = useState(false);
  const step1Ctx = useContext(StepVisibilityContext);
  const formDataCtx = useContext(FormDataContext);
  const nameInputsStateCtx = formDataCtx.formDataState.step1.names;
  const selectedNamesCountCtx = formDataCtx.formDataState.step1.namesCount;
  console.log(selectedNamesCountCtx);
  const peopleCountHandler = () => {
    const selectedValue = selectPeopleCountRef.current.value;
    formDataCtx.context.updateFormDataStateHandler("step1", {
      names: nameInputsStateCtx,
      namesCount: selectedValue,
    });
    // INIT VALUES
    for (let i = 1; i <= selectedValue; i++) {
      const key = `attendeeName${i}`;
      if (nameInputsStateCtx[key] === undefined) {
        nameInputsStateCtx[key] = "";
      }
    }
    // DELETE UN USEFUL DATA
    if (selectedValue < Object.keys(nameInputsStateCtx).length) {
      for (let i = +selectedValue + 1; i < 20; i++) {
        delete nameInputsStateCtx[`attendeeName${i}`];
      }
    }
  };

  const inputChangeHandler = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    formDataCtx.context.updateFormDataStateHandler("step1", {
      names: {
        ...nameInputsStateCtx,
        [key]: value,
      },
      namesCount: selectedNamesCountCtx,
    });
  };
  const peopleNameInputs = [];
  for (let i = 1; i <= selectedNamesCountCtx; i++) {
    peopleNameInputs.push(
      <Input
        input={{
          type: "text",
          id: `attendeeName${i}`,
          onChange: inputChangeHandler,
          value: nameInputsStateCtx[`attendeeName${i}`],
        }}
        label={`Attendee ${i} Name  `}
        key={`${i}`}
        required
      />
    );
  }
  const enteredNames = Object.keys(nameInputsStateCtx).map(function (key) {
    return nameInputsStateCtx[key];
  });

  //  step 1 is done
  useEffect(() => {
    if (
      enteredNames.includes("") ||
      enteredNames.includes(undefined) ||
      enteredNames.length === 0 ||
      selectedNamesCountCtx === 0
    ) {
      setStep1IsDone(false);
    } else {
      setStep1IsDone(true);
    }
  }, [enteredNames]);

  useEffect(() => {
    if (step1IsDone) {
      step1Ctx.context.setStepIsDoneTrue("step1");
    } else {
      step1Ctx.context.setStepIsDoneFalse("step1");
    }
  }, [step1IsDone]);
  
  return (
    <Fragment>
      <h3>How many people will be attending? </h3>
      <Select
        ref={selectPeopleCountRef}
        id="peopleAttendingCount"
        options={[...peopleCountOptions]}
        onChange={peopleCountHandler}
        value={selectedNamesCountCtx}
      />
      {peopleNameInputs.length >= 1 && <h2>Please provide full names: </h2>}
      {peopleNameInputs}
    </Fragment>
  );
};

export default Step1;
