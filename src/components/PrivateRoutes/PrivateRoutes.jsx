import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import interceptor from "../../api/interceptor";
import useAppContext from "../../hooks/useAppContext";

const PrivateRoutes = () => {
  const { auth, setAuth } = useAppContext();

  useEffect(() => {
    interceptor(setAuth);
  }, [setAuth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
