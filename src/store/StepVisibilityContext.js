import React from "react";

const StepVisibilityContext = React.createContext({
    step1IsDone : false,
    step2IsDone : false,
    step3IsDone : false,
});

export default StepVisibilityContext;