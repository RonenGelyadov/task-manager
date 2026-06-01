import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Router from "./router/Router";
import UserProvider from "./providers/UserProvider";
import ProjectThemeProvider from "./providers/ProjectThemeProvider";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ProjectThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </ProjectThemeProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
