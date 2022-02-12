import React, { Fragment } from "react";
import Input from "../UI/Input";
const Step2 = () => {
  return (
    <Fragment>
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
      />
    </Fragment>
  );
};

export default Step2;
