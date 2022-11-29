import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(true);
  const [authLoader, setAuthLoader] = useState(false);
  const handleSidebarToggle = () => {
    setShow(!show);
  };
  return <UserContext.Provider value={{ auth, user, setAuth, setUser, loggedIn, setLoggedIn, show, setShow, handleSidebarToggle, authLoader, setAuthLoader }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
