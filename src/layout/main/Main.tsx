import type { ReactNode } from "react";
import { Box } from "@mui/material";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "82vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
