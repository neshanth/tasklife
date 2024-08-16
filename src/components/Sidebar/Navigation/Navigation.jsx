import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icons from "../../Icons/Icons";
import "./navigation.css";

const navigationLinks = [
  {
    name: "Dashboard",
    path: "/dashboard/tasks",
    icon: <Icons type="house" />,
  },
  {
    name: "Stats",
    path: "/dashboard/stats",
    icon: <Icons type="stats" />,
  },
];
const Navigation = ({ handleSidebarForMobile }) => {
  let location = useLocation();
  return (
    <nav className="navigation">
      <p className="sidebar-section-heading">MENU</p>
      <ul className="navigation-list">
        {navigationLinks.map((link) => (
          <li className={`navigation-item  ${location.pathname === link.path ? "sidebar-link-active" : ""}`} key={link.name}>
            <NavLink className={`nav-link tl-padding`} onClick={handleSidebarForMobile} to={link.path}>
              {link.icon}
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="add-task">
        <p className="tl-padding add-task-text">
          <Icons type="plus" />
          Add Task
        </p>
      </div>
    </nav>
  );
};
export default Navigation;
