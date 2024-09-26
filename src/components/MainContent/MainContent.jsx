import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import useAppContext from "../../hooks/useAppContext";
import MobileHeader from "../MobileHeader/MobileHeader";
import "./mainContent.scss";

function MainContent() {
  const { show, setShow, setAuth, isMobile } = useAppContext();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  if (loading) return <Spinner />;

  return (
    <div className="main-content">
      {isMobile && <MobileHeader />}
      <div className="content-wrapper tl-border">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default MainContent;
