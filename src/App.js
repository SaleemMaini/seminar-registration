import Layout from "./components/layouts/Layout";
import Form from "./components/Form/Form";
import {StepVisibilityProvider} from "./store/StepVisibilityContextProvider";

function App() {
  return (
    <StepVisibilityProvider>
    <Layout>
      <Form />
    </Layout>
    </StepVisibilityProvider>
  );
}

export default App;
