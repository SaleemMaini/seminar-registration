import React from "react";
import FormCard from "./FormCard";
import classes from './Form.module.css'


const Form = ({ step }) => {
  return (
    <form className={classes['form-container']}>
      {/* STEP 1 CARD */}
      <FormCard step="1" />
      {/* STEP 2 CARD */}
      <FormCard step="2" />
      {/* STEP 3 CARD */}
      <FormCard step="3" />
    </form>
  );
};
export default Form;
