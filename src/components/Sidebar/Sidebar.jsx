import React, { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/context";
import CloseButton from "../../assets/Icons/CloseButton";
import logo from "../../assets/Images/tasklife__logo-white.png";
import "./sidebar.css";
import LogoutIcon from "../../assets/Icons/LogoutIcon";
import PieIcon from "../../assets/Icons/PieIcon";
import ListIcon from "../../assets/Icons/ListIcon";
import Spinner from "../Spinner/Spinner";
import api from "../../api/api";
import history from "../../history/history";

function Sidebar({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const { show, setShow } = useContext(UserContext);
  let location = useLocation();

  const handleClick = () => {
    setShow(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      let response = await api.post("/api/logout", {});
      if (response.status === 200) {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSidebarForMobile = () => {
    window.innerWidth <= 1024 ? setShow(false) : setShow(true);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Offcanvas className="sidebar" show={show} tabIndex="" onHide={handleClose} backdrop={false}>
        <Offcanvas.Header className="border-bottom">
          <img alt="logo" src={logo} width="100" />
          <CloseButton handleClick={handleClick} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/stats" ? "sidebar-link-active" : ""}`}>
            <NavLink onClick={handleSidebarForMobile} to="/dashboard/stats">
              <PieIcon />
              Stats
            </NavLink>
          </div>
          <div className={`d-flex text-white align-items-center sidebar-link ${location.pathname === "/dashboard/tasks" ? "sidebar-link-active" : ""}`}>
            <NavLink onClick={handleSidebarForMobile} to="/dashboard/tasks">
              <ListIcon />
              My Tasks
            </NavLink>
          </div>
          <div className="d-flex text-white align-items-center logout-menu" onClick={logout}>
            <LogoutIcon />
            <p className="mb-0">Logout</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
