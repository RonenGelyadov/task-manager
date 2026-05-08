import type { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
