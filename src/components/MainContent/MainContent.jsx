import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import api from "../../api/api";
import history from "../../history/history";
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

  const logout = async () => {
    setLoading(true);
    try {
      let response = await api.post("/api/logout", {});
      if (response.status === 200) {
        setAuth(false);
        setLoading(false);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="main-content">
      {/* <Sidebar show={show} logout={logout} handleClose={handleClose} /> */}
      {isMobile && <MobileHeader />}
      {/* {<Sidebar logout={logout} />} */}
      <div className="content-wrapper tl-border">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default MainContent;
