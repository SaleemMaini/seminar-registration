import React, { Fragment } from "react";

const Select = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <select id={props.id} style={{ width: "130px" }} ref={ref} onChange={props.onChange} value={props.value} >
        <option key={0} value={0} disabled>
          Please choose
        </option>
        {props.options.map((optionItem) => (
          <option value={optionItem} key={optionItem}>{optionItem}</option>
        ))}
      </select>
    </Fragment>
  );
});

export default Select;
