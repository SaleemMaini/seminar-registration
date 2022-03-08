import React, { Fragment, useRef, useContext } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { FormDataContext } from "../../store/FormDataContext";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import "./Steps.css";
const Step1 = (props) => {
  const setNameInputsTotalCount = 5; // SET NUMBER OF ITEMS YOU WANT.
  let peopleCountOptions = [];
  for (let i = 1; i <= setNameInputsTotalCount; i++) {
    peopleCountOptions.push(i);
  }
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
      <CSSTransition key={`${i}`} classNames="slide" timeout={300}>
        <Input
          input={{
            type: "text",
            id: `attendeeName${i}`,
            onChange: inputChangeHandler,
            value: nameInputsStateCtx[`attendeeName${i}`],
          }}
          label={`Attendee ${i} Name  `}
          required
          className=""
        />
      </CSSTransition>
    );
  }

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

      {peopleNameInputs.length >= 1 && (
        <div className="slide-down-animation">
          <h2>Please provide full names: </h2>
          <TransitionGroup>{peopleNameInputs}</TransitionGroup>
        </div>
      )}
    </Fragment>
  );
};

export default Step1;
