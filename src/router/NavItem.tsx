import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "../providers/ProjectThemeProvider";

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
  const { isDark } = useTheme();

  if (isMainNav) {
    return (
      <NavLink
        to={to}
        style={({ isActive }) => ({
          ...navLinkStyle,
          backgroundColor: isActive ? "white" : "transparent",
          color: isActive ? (isDark ? "black" : "blue") : "white",
        })}
      >
        <Typography variant="body1">{label}</Typography>
      </NavLink>
    );
  } else {
    return (
      <NavLink to={to}>
        <Typography
          color="textPrimary"
          variant="body1"
          sx={{ textDecoration: "underline" }}
        >
          {label}
        </Typography>
      </NavLink>
    );
  }
};

export default NavItem;
