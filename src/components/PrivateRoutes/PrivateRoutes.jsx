import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import interceptor from "../../api/interceptor";
import useAuthContext from "../../hooks/useAuthContext";

const PrivateRoutes = () => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    interceptor(setAuth);
  }, [setAuth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
