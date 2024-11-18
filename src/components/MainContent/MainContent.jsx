import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useAppContext from "../../hooks/useAppContext";
import MobileHeader from "../MobileHeader/MobileHeader";
import "./mainContent.scss";
import AddTask from "../AddTask/AddTask";

function MainContent() {
  const { isMobile } = useAppContext();
  const [loading] = useState(false);

  if (loading) return <Spinner />;

  return (
    <div className="tl-app-wrapper">
      <div className="main-content">
        {isMobile && <MobileHeader />}
        <div className="content-wrapper tl-border">
          <Outlet />
        </div>
      </div>
      {isMobile && <AddTask />}
    </div>
  );
}

export default MainContent;
