import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { useTheme } from "../../providers/ProjectThemeProvider";

const Main = ({ children }: { children: ReactNode }) => {
  const { isDark } = useTheme();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 2,
        overflowY: "auto",
        paddingTop: "1em",
        backgroundColor: isDark ? "#3e3f45" : "#F8F9FA",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
