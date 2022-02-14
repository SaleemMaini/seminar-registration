import { createContext } from "react";
import { useState } from "react";
import { useMemo,useEffect } from "react";

export const FormDataContext = createContext();

const defaultFormDataState = {
  step1: {
    namesCount: 0,
    names: { attendeeName1: "" },
  },
  step2: {
    question1: null,
    question2: null,
    companyName: "",
  },
  step3: {
    step3CheckBoxIsChecked: null,
  },
  step1IsDone: false,
  step2IsDone: false,
  step3IsDone: false,
};

export const FormDataContextProvider = (props) => {
  const [formDataState, setFormDataState] = useState(defaultFormDataState);

  let context = useMemo(
    () => ({
      updateFormDataStateHandler(i, newStateData) {
        setFormDataState({
          ...formDataState,
          [i]: newStateData,
        });
      },
      resetFormDataStateHandler() {
        setFormDataState({
          ...defaultFormDataState,
        });
      },
    }),
    [formDataState, setFormDataState]
  );

  return (
    <FormDataContext.Provider value={{ formDataState, context }}>
      {props.children}
    </FormDataContext.Provider>
  );
};
