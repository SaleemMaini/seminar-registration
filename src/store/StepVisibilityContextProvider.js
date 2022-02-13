import { createContext } from "react";
import { useState } from "react";
import { useMemo } from "react";

export const StepVisibilityContext = createContext();

export const StepVisibilityProvider = (props) => {
  const [stepIsDone, setStepIsDone] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  let context = useMemo(
    () => ({
      setStepIsDoneFalse(i) {
        setStepIsDone({
          ...stepIsDone,
          [i]: false,
        });
      },
      setStepIsDoneTrue(i) {
        setStepIsDone({
          ...stepIsDone,
          [i]: true,
        });
      },
    }),
    );

  return (
    <StepVisibilityContext.Provider value={{ stepIsDone, context }}>
      {props.children}
    </StepVisibilityContext.Provider>
  );
};
