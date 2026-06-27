import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NavItem from "../../router/NavItem";
import ROUTES from "../../router/routs";
import { useTheme } from "../../providers/ProjectThemeProvider";
import { useUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isDark, toggleMode } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="md"
          component="header"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            minWidth: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <IconButton color="inherit" onClick={toggleMode}>
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Box sx={{ flex: 2, display: "flex", justifyContent: "space-between" }}>
            <NavItem to={ROUTES.HOME} label="Home" />
            <NavItem to={ROUTES.ABOUT} label="About" />
            <NavItem to={ROUTES.CONTACT} label="Contact" />
            {user ? (
              <Button
                sx={{ color: "white", border: "1px solid white", borderRadius: "8px" }}
                onClick={async () => {
                  (await logout()) && navigate(ROUTES.LOGIN);
                }}
              >
                Log Out
              </Button>
            ) : (
              <NavItem to={ROUTES.LOGIN} label="Log In" />
            )}
          </Box>
          <Box sx={{ flex: 1, textAlign: "right" }}>
            <Typography>{`שלום, ${user?.firstName || "אורח"}`}</Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
