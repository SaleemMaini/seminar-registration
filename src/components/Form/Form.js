import React, { useContext, useState, useEffect } from "react";
import FormCard from "./FormCard";
import classes from "./Form.module.css";
import { FormDataContext } from "../../store/FormDataContext";
import checkMark from "../../assets/check-icon.png";

const Form = ({ step }) => {
  const formDataCtx = useContext(FormDataContext);
  const step1IsDoneCtx = formDataCtx.formDataState.step1IsDone;
  const step2IsDoneCtx = formDataCtx.formDataState.step2IsDone;
  const step3IsDoneCtx = formDataCtx.formDataState.step3IsDone;

  const [step2VisibilityStyle, setStep2VisibilityStyle] = useState("");
  const [step3VisibilityStyle, setStep3VisibilityStyle] = useState("");

  
  useEffect(() => {
    if (!step1IsDoneCtx) {
      setStep2VisibilityStyle(classes.disabled);
    } else if (step1IsDoneCtx) {
      setStep2VisibilityStyle("");
    }

    if (!step1IsDoneCtx || !step2IsDoneCtx) {
      setStep3VisibilityStyle(classes.disabled);
    } else if (step1IsDoneCtx && step2IsDoneCtx) {
      setStep3VisibilityStyle("");
    }
  }, [step1IsDoneCtx, step2IsDoneCtx]);
  // OUT PUT
  const enteredNamesCount = formDataCtx.formDataState.step1.namesCount;
  const enteredNames = formDataCtx.formDataState.step1.names;
  const isTheAttendedWantCompanyName =
    formDataCtx.formDataState.step2.question1;
  const badgeCompanyName = formDataCtx.formDataState.step2.companyName;
  const isAnyoneRequireSpecialAccommodations =
    formDataCtx.formDataState.step2.question2;
  const isAttendeeReadyToRock =
    formDataCtx.formDataState.step3.step3CheckBoxIsChecked;


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
    
    fetch(
      "https://seminar-registration-186cb-default-rtdb.firebaseio.com/registrations.json",
      {
        method: "POST",
        body: JSON.stringify({
          namesCount: enteredNamesCount,
          names : enteredNames,
          isTheAttendedWantCompanyName : isTheAttendedWantCompanyName,
          companyName: badgeCompanyName,
          isAnyoneRequireSpecialAccommodations: isAnyoneRequireSpecialAccommodations,
          isAttendeeReadyToRock: isAttendeeReadyToRock
        }),
      }
    );

    formDataCtx.context.resetFormDataStateHandler();
  };

  return (
    <form className={classes["form-container"] } onSubmit={submitHandler}>
      <FormCard step="1">
        {step1IsDoneCtx && (
          <div className={classes.checkMark }>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
      </FormCard>

      <FormCard step="2" className={step2VisibilityStyle}>
        {step2IsDoneCtx && (
          <div className={classes.checkMark }>
            <img src={checkMark} alt="checkMarkIcon" />
          </div>
        )}
      </FormCard>

      <FormCard step="3" className={step3VisibilityStyle}>
        <button
          type="submit"
          disabled={!step1IsDoneCtx || !step2IsDoneCtx || !step3IsDoneCtx}
        >
          Complete Registration
        </button>
      </FormCard>
    </form>
  );
};
export default Form;
