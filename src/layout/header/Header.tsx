import { AppBar, Container, Toolbar } from "@mui/material";
import NavItem from "../../router/NavItem";
import ROUTES from "../../router/routs";

const Header = () => {
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
          <NavItem to={ROUTES.HOME} label="Home" />
          <NavItem to={ROUTES.ABOUT} label="About" />
          <NavItem to={ROUTES.CONTACT} label="Contact" />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
