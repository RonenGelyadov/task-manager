import type { ReactNode } from "react";
import { Box } from "@mui/material";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 2,
        overflowY: "auto",
        paddingTop: "1em",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
