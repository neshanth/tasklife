import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Tasks from "./components/Tasks/Tasks";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { checkAuth } from "./utils/utils";

function App() {
  // useEffect(() => {
  //   checkAuth();
  // }, []);
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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
