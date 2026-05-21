import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navLinkStyle = {
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "500",
  transition: "all 0.3s ease",
};

type NavItemProps = {
  to: string;
  label: string;
  isMainNav?: boolean;
};

const NavItem = ({ to, label, isMainNav = true }: NavItemProps) => {
  if (isMainNav) {
    return (
      <NavLink
        to={to}
        style={({ isActive }) => ({
          ...navLinkStyle,
          backgroundColor: isActive ? "white" : "transparent",
          color: isActive ? "blue" : "white",
        })}
      >
        <Typography variant="body1">{label}</Typography>
      </NavLink>
    );
  } else {
    return (
      <NavLink to={to}>
        <Typography variant="body1">{label}</Typography>
      </NavLink>
    );
  }
};

export default NavItem;
