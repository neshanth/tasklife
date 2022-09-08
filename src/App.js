import React, { useEffect, useRef } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Tasks from "./components/Tasks/Tasks";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import api from "./api/api";
import { useNavigate } from "react-router-dom";
import EditTask from "./components/EditTask/EditTask";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const effectRan = useRef(false);
  let navigate = useNavigate();

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
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/tasks" element={<Tasks />} />
            <Route path="/dashboard/tasks/edit/:id" element={<EditTask />} />
            <Route path="/dashboard/tasks/new" element={<NewTask />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
