import React, { useEffect, useRef } from "react";
import Home from "../Home/Home";
import Header from "../Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Tasks from "../Tasks/Tasks";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import api from "../../api/api";
import EditTask from "../EditTask/EditTask";
import NewTask from "../NewTask/NewTask";
import Stats from "../Stats/Stats.jsx";

function App() {
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      checkAuth();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const checkAuth = async () => {
    try {
      await api.get("/api/user");
      localStorage.setItem("isAuth", true);
    } catch (err) {
      localStorage.removeItem("isAuth");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/stats" element={<Stats />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
            <Route path="/dashboard/tasks/edit/:id" element={<EditTask />} />
            <Route path="/dashboard/tasks/new" element={<NewTask />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;
