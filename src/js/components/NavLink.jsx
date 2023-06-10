import { NavLink as RRDNavLink } from "react-router-dom";

export function NavLink({ to, className, activeClass = "navlink-active", children }) {
  return (
    <RRDNavLink className={({ isActive }) => (isActive ? activeClass : className)} to={to}>
      {children}
    </RRDNavLink>
  );
}
