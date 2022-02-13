import { createContext } from "react";
import { useState } from "react";
import { useMemo } from "react";

export const FormDataContext = createContext();

const defaultFormDataState = {
  step1: {
    attendeeName: "",
  },
  step2: {
    question1: "YES",
    question2: "NO",
  },
  step3: {
    checkBox: false,
  },
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
    }),
    [formDataState, setFormDataState]
  );

  return (
    <FormDataContext.Provider value={{ formDataState, context }}>
      {props.children}
    </FormDataContext.Provider>
  );
};
