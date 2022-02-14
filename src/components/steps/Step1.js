import React, { Fragment, useRef, useEffect, useContext } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { FormDataContext } from "../../store/FormDataContext";

const Step1 = (props) => {
  const peopleCountOptions = [1, 2, 3, 4, 5]; // IF YOU WANT MORE OPTIONS JUST ADD ITEMS TO THE ARRAY HERE
  const selectPeopleCountRef = useRef();
  const formDataCtx = useContext(FormDataContext);
  const nameInputsStateCtx = formDataCtx.formDataState.step1.names;
  const selectedNamesCountCtx = formDataCtx.formDataState.step1.namesCount;

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

  const emptyValue = enteredNames.map((e) => e.trim() === "");
  
  //  step 1 is done
  const inputsIsEmpty =
    enteredNames.includes("") ||
    enteredNames.includes(undefined) ||
    enteredNames.length === 0 ||
    selectedNamesCountCtx === 0 ||
    emptyValue.includes(true)
    

  useEffect(() => {
    if (inputsIsEmpty) {
      formDataCtx.context.updateFormDataStateHandler("step1IsDone", false);
    } else {
      formDataCtx.context.updateFormDataStateHandler("step1IsDone", true);
    }
  }, [inputsIsEmpty]);

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
