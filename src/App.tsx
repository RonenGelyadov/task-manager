import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Router from "./router/Router";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
