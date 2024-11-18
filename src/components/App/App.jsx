import React from "react";
import TaskManager from "../TaskManager/TaskManager";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <main className={`tl-main ${location.pathname !== "/app" ? "tl-home" : ""}`}>
      <TaskManager />
    </main>
  );
}

export default App;
