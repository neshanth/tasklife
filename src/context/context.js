import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [authLoader, setAuthLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const isMobile = useIsMobile()
  const handleSidebarToggle = () => {
    setShow(!show);
  };
  const valueObj = {
    show,
    setShow,
    handleSidebarToggle,
    auth,
    setAuth,
    authLoader,
    setAuthLoader,
    user,
    setUser,
    loading,
    setLoading,
    fetchData,
    setFetchData,
    allTags,
    setAllTags,
    isMobile
  }
  return <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
