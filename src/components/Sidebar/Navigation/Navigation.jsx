import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icons from "../../Icons/Icons";
import "./navigation.scss";
import AddTask from "../../AddTask/AddTask";

const appPath = "/app";

const navigationLinks = [
  {
    name: "Tasks",
    path: `${appPath}/tasks`,
    icon: <Icons type="house" />,
  },
  {
    name: "Stats",
    path: `${appPath}/stats`,
    icon: <Icons type="stats" />,
  },
];
const Navigation = () => {
  let location = useLocation();
  return (
    <nav className="tl-navigation">
      <p className="tl-navigation__sidebar-section-heading">MENU</p>
      <ul className="tl-navigation__navigation-list">
        {navigationLinks.map((link) => (
          <li className={`tl-navigation__navigation-item  ${location.pathname === link.path ? "sidebar-link-active" : ""}`} key={link.name}>
            <NavLink className="tl-navigation__nav-link tl-padding" to={link.path}>
              {link.icon}
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <AddTask />
    </nav>
  );
};
export default Navigation;
