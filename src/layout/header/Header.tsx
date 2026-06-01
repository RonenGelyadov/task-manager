import { AppBar, Container, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NavItem from "../../router/NavItem";
import ROUTES from "../../router/routs";
import { useTheme } from "../../providers/ProjectThemeProvider";

const Header = () => {
  const { isDark, toggleMode } = useTheme();

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
          }}
        >
          <IconButton color="inherit" onClick={toggleMode}>
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <NavItem to={ROUTES.HOME} label="Home" />
          <NavItem to={ROUTES.ABOUT} label="About" />
          <NavItem to={ROUTES.CONTACT} label="Contact" />
          <NavItem to={ROUTES.LOGIN} label="Log In" />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
