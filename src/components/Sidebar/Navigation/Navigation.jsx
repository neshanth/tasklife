import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icons from "../../Icons/Icons";
import AddTask from "../../AddTask/AddTask";
import "./navigation.scss";

const appPath = "/app";

const navigationLinks = [
  {
    name: "Dashboard",
    path: `${appPath}/dashboard`,
    icon: <Icons type="stats" />,
  },
  {
    name: "Tasks",
    path: `${appPath}/tasks`,
    icon: <Icons type="house" />,
  },
  {
    name: "Inbox",
    path: `${appPath}/inbox`,
    icon: <Icons type="inbox" />,
  },
];
const Navigation = ({ handleMobileNavToggle }) => {
  let location = useLocation();
  return (
    <nav className="tl-navigation">
      <p className="tl-navigation__sidebar-section-heading">MENU</p>
      <ul className="tl-navigation__navigation-list">
        {navigationLinks.map((link) => (
          <li onClick={handleMobileNavToggle} className={`tl-navigation__navigation-item  ${location.pathname === link.path ? "sidebar-link-active" : ""}`} key={link.name}>
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
