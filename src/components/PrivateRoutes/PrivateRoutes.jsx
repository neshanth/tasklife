import { React } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("isAuth");

  return auth === "true" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
