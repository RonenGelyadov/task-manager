import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100vh", // גובה קשיח של 100% מהמסך (לא מינימום)
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // מונע גלילה חיצונית של כל ה-Layout
      }}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  );
};

export default Layout;
