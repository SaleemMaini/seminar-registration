import React, { useContext, useState, useEffect ,useRef} from "react";
import FormCard from "./FormCard";
import classes from "./Form.module.css";
import { FormDataContext } from "../../store/FormDataContext";
import CheckMark from "../../assets/CheckMark";
const Form = ({ step }) => {
  const formDataCtx = useContext(FormDataContext);
  const [step1IsDone, setStep1IsDone] = useState(false);
  const [step2IsDone, setStep2IsDone] = useState(false);
  const [step3IsDone, setStep3IsDone] = useState(false);

  const [step2VisibilityStyle, setStep2VisibilityStyle] = useState("");
  const [step3VisibilityStyle, setStep3VisibilityStyle] = useState("");

  
  // GET DATA FROM THE CONTEXT STORE
  const enteredNamesCount = formDataCtx.formDataState.step1.namesCount;
  const enteredNames = formDataCtx.formDataState.step1.names;
  const isTheAttendedWantCompanyName =
    formDataCtx.formDataState.step2.question1;
  const badgeCompanyName = formDataCtx.formDataState.step2.companyName;
  const isAnyoneRequireSpecialAccommodations =
    formDataCtx.formDataState.step2.question2;
  const isAttendeeReadyToRock =
    formDataCtx.formDataState.step3.step3CheckBoxIsChecked;

  //  STEP 1 IS DONE
  const enteredNamesArray = Object.keys(enteredNames).map(function (key) {
    return enteredNames[key];
  });

  const emptyValues = enteredNamesArray.map((e) => e.trim() === "");

  const inputsIsEmpty =
    enteredNamesArray.includes("") ||
    enteredNamesArray.includes(undefined) ||
    enteredNamesArray.length === 0 ||
    enteredNamesCount === 0 ||
    emptyValues.includes(true);

  useEffect(() => {
    if (inputsIsEmpty) {
      setStep1IsDone(false);
    } else {
      setStep1IsDone(true);
    }
  }, [inputsIsEmpty]);

  // STEP 2 IS DONE
  const companyNameIsEmpty =
    isTheAttendedWantCompanyName === "YES" && badgeCompanyName.trim() === "";

  useEffect(() => {
    if (
      isTheAttendedWantCompanyName === null ||
      isAnyoneRequireSpecialAccommodations === null ||
      companyNameIsEmpty
    ) {
      setStep2IsDone(false);
    } else {
      setStep2IsDone(true);
    }
  }, [
    isTheAttendedWantCompanyName,
    isAnyoneRequireSpecialAccommodations,
    companyNameIsEmpty,
  ]);

  // STEP 3 IS DONE
  useEffect(() => {
    if (isAttendeeReadyToRock) {
      setStep3IsDone(true);
    } else {
      setStep3IsDone(false);
    }
  }, [isAttendeeReadyToRock]);

  // HANDLE STEPS VISIBILITY
  useEffect(() => {
    if (!step1IsDone) {
      setStep2VisibilityStyle(classes.disabled);
    } else if (step1IsDone) {
      setStep2VisibilityStyle("");
    }

    if (!step1IsDone || !step2IsDone) {
      setStep3VisibilityStyle(classes.disabled);
    } else if (step1IsDone && step2IsDone) {
      setStep3VisibilityStyle("");
    }
  }, [step1IsDone, step2IsDone]);

  // OUT PUT TO CONSOLE
  const outPut = `The number of people will be attending is:  ${enteredNamesCount}, \n
    there names is: ${JSON.stringify(enteredNames)} \n
    the attendee want his company name on the badge: ${
      isTheAttendedWantCompanyName === "YES"
        ? "YES, the company name is : " + badgeCompanyName
        : "NO"
    }, \n
    Is Anyone Require Special Accommodations: ${
      isAnyoneRequireSpecialAccommodations === "YES" ? "YES" : "NO"
    }, \n
    Is Attendee Ready To Rock: ${isAttendeeReadyToRock ? "YES" : "NO"}
    `;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(outPut);
    // SEND DATA TO FIREBASE API
    fetch(
      "https://seminar-registration-186cb-default-rtdb.firebaseio.com/registrations.json",
      {
        method: "POST",
        body: JSON.stringify({
          namesCount: enteredNamesCount,
          names: enteredNames,
          isTheAttendedWantCompanyName: isTheAttendedWantCompanyName,
          companyName: badgeCompanyName,
          isAnyoneRequireSpecialAccommodations:
            isAnyoneRequireSpecialAccommodations,
          isAttendeeReadyToRock: isAttendeeReadyToRock,
        }),
      }
    );
    // RESET CONTEXT DATA
    formDataCtx.context.resetFormDataStateHandler();
  };

  return (
    <form className={classes["form-container"]} onSubmit={submitHandler}>
      <FormCard step="1">
        <CheckMark steps={step1IsDone} />
      </FormCard>
      <FormCard step="2" className={step2VisibilityStyle}>
        <CheckMark steps={step2IsDone}  />
      </FormCard>
      <FormCard step="3" className={step3VisibilityStyle}>
        <button
          type="submit"
          disabled={!step1IsDone || !step2IsDone || !step3IsDone}
        >
          Complete Registration
        </button>
      </FormCard>
    </form>
  );
};
export default Form;
