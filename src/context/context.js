import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [authLoader, setAuthLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [filters, setFilters] = useState({
    status: "pending",
    date: "",
    tags: []
  })
  const isMobile = useIsMobile()
  const handleMobileNavToggle = () => {
    setShowMobileNav(!showMobileNav);
  };
  const valueObj = {
    showMobileNav,
    setShowMobileNav,
    handleMobileNavToggle,
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
    isMobile,
    filters,
    setFilters,
  }
  return <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
