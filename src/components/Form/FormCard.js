import React, { Fragment, useRef } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import classes from "./FormCard.module.css";
import { useState } from "react";

const FormCard = ({ step }) => {
  const peopleCountRef = useRef();
  const [peopleCount,setPeopleCount] = useState(0)

  const peopleCountHandler = () => {
    setPeopleCount(peopleCountRef.current.value)
  }

  // STEP 1 CONTENT
  const step1Content = (
    <Fragment>
      <h3>How many people will be attending? </h3>
      <Select
        ref={peopleCountRef}
        id="peopleAttendingCount"
        options={[1, 2, 3, 4]}
        onChange={peopleCountHandler}
      /> 
      <div>
        
      </div>
    </Fragment>
  );
  // STEP 2 CONTENT
  const step2Content = (
    <Fragment>
      {/* <h3>Would you like your company name on your badge? </h3>
      <br />
      <Input
        input={{
          id: "yesRadio",
          type: "radio",
          name: "companyLogoRadio",
        }}
        label="Yes "
      />
      <Input
        input={{
          id: "noRadio",
          type: "radio",
          name: "companyLogoRadio",
        }}
        label="No"
      />


      <br />
      <h3>Would you like your company name on your badge? </h3>
      <br />
      <Input
        input={{
          id: "yesRadio",
          type: "radio",
          name: "companyLogoRadio",
        }}
        label="Yes "
      />
      <Input
        input={{
          id: "noRadio",
          type: "radio",
          name: "companyLogoRadio",
        }}
        label="No"
      /> */}
    </Fragment>
  );

  // STEP 3 CONTENT
  const step3Content = "STEP 3";

  return (
    <div className={classes["form-card"]}>
      <span className={classes["form-card-header"]}>Step {step}</span>
      <div className={classes["form-card-content"]}>
        {step === "1"
          ? step1Content
          : step === "2"
          ? step2Content
          : step === "3"
          ? step3Content
          : "NO STEP NUMBER PROVIDED"}
      </div>
      {console.log(peopleCount)}    
    </div>
  );
};

export default FormCard;
