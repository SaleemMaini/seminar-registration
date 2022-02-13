import Layout from "./components/layouts/Layout";
import Form from "./components/Form/Form";
import { StepVisibilityProvider } from "./store/StepVisibilityContextProvider";
import { FormDataContextProvider } from "./store/FormDataContext";

function App() {
  return (
    <StepVisibilityProvider>
      <FormDataContextProvider>
        <Layout>
          <Form />
        </Layout>
      </FormDataContextProvider>
    </StepVisibilityProvider>
  );
}

export default App;
