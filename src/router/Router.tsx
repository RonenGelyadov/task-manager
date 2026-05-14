import { Route, Routes } from "react-router-dom";
import ROUTES from "./routs";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Task from "../pages/Task";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.CONTACT} element={<Contact />} />
      <Route path={ROUTES.TASK + "/:id"} element={<Task />} />
    </Routes>
  );
};

export default Router;
