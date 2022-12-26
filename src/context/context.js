import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [authLoader, setAuthLoader] = useState(false);
  const handleSidebarToggle = () => {
    setShow(!show);
  };
  return <UserContext.Provider value={{ show, setShow, handleSidebarToggle, auth, setAuth, authLoader, setAuthLoader, user, setUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
