import Layout from "./components/layouts/Layout";
import Form from "./components/Form/Form";
import { FormDataContextProvider } from "./store/FormDataContext";

function App() {
  return (
    <FormDataContextProvider>
      <Layout>
        <Form />
      </Layout>
    </FormDataContextProvider>
  );
}

export default App;
