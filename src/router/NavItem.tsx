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
};

const NavItem = ({ to, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...navLinkStyle,
        backgroundColor: isActive ? "white" : "transparent",
        color: isActive ? "blue" : "white",
      })}
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
