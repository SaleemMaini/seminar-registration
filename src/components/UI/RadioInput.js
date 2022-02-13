import React from "react";
import { Fragment } from "react";

const RadioInput = (props) => {
  return (
    <Fragment>
      <input {...props.input} type="radio" />
      <label htmlFor={props.input.id}>{props.label}</label>
    </Fragment>
  );
};

export default RadioInput;
