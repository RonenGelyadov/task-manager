import { AppBar, Box, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavItem from "../../router/NavItem";
import ROUTES from "../../router/routs";

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: 10,
            justifyContent: "space-around",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <HomeIcon />
          <NavItem to={ROUTES.HOME} label="Home" />
          <NavItem to={ROUTES.ABOUT} label="About" />
          <NavItem to={ROUTES.CONTACT} label="Contact" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
