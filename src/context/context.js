import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const handleSidebarToggle = () => {
    setShow(!show);
  };
  return <UserContext.Provider value={{ show, setShow, handleSidebarToggle }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
