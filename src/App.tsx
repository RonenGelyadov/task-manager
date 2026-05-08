import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
