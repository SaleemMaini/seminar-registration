import React, { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <input {...props.input} />
      <label htmlFor={props.input.id}>{props.label}</label>
    </Fragment>
  );
};

export default Input;
