import React from "react";
import TaskManager from "../TaskManager/TaskManager";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isAppPage = location.pathname.includes("/app");
  return (
    <main className={`tl-main ${!isAppPage ? "tl-home" : ""} ${isAuthPage ? "tl-auth" : ""}`}>
      <TaskManager />
    </main>
  );
}

export default App;
