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
  const peopleCountOptions = [1, 2, 3, 4, 5]; // IF YOU WANT MORE OPTIONS JUST ADD ITEMS TO THE ARRAY HERE
  const selectPeopleCountRef = useRef();
  const [selectedPeopleCount, setSelectedPeopleCount] = useState(0);
  const [step1IsDone, setStep1IsDone] = useState(false);
  const [nameInputsState, setNameInputsState] = useState({});
  const step1Ctx = useContext(StepVisibilityContext);
  const formDataCtx = useContext(FormDataContext);

  const peopleCountHandler = () => {
    const selectedValue = selectPeopleCountRef.current.value;
    setSelectedPeopleCount(selectedValue);
    // INIT VALUES
    for (let i = 1; i <= selectedValue; i++) {
      const key = `attendeeName${i}`;
      if (nameInputsState[key] === undefined) {
        nameInputsState[key] = "";
      }
    }
    // DELETE UN USEFUL DATA
    if (selectedValue < Object.keys(nameInputsState).length) {
      for (let i = +selectedValue + 1; i < 10; i++) {
        delete nameInputsState[`attendeeName${i}`];
      }
    }
  };

  const inputChangeHandler = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setNameInputsState({ ...nameInputsState, [key]: value });
  };

  const peopleNameInputs = [];
  for (let i = 1; i <= selectedPeopleCount; i++) {
    peopleNameInputs.push(
      <Input
        input={{
          type: "text",
          id: `attendeeName${i}`,
          onChange: inputChangeHandler,
          value: nameInputsState[`attendeeName${i}`],
        }}
        label={`Attendee ${i} Name  `}
        key={`${i}`}
        required
      />
    );
  }

  const enteredNames = Object.keys(nameInputsState).map(function (key) {
    return nameInputsState[key];
  });

  //  step 1 is done
  useEffect(() => {
    if (
      enteredNames.includes("") ||
      enteredNames.includes(undefined) ||
      enteredNames.length === 0
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

  // UPDATE FORM DATA CONTEXT WHEN NAME INPUT STATE IS UPDATED
  useEffect(() => {
    formDataCtx.context.updateFormDataStateHandler("step1", nameInputsState);
  }, [nameInputsState]);

  return (
    <Fragment>
      <h3>How many people will be attending? </h3>
      <Select
        ref={selectPeopleCountRef}
        id="peopleAttendingCount"
        options={[...peopleCountOptions]}
        onChange={peopleCountHandler}
      />
      {peopleNameInputs.length >= 1 && <h2>Please provide full names: </h2>}
      {peopleNameInputs}
      {step1IsDone ? <p>done</p> : <p>no</p>}
    </Fragment>
  );
};

export default Step1;
