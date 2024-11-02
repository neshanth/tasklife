import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { FILTER } from "../constants/constants";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [authLoader, setAuthLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [filters, setFilters] = useState(FILTER);
  const [taskFormAction, setTaskFormAction] = useState("create");
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
    taskFormAction,
    setTaskFormAction,
    setFilters,
    tasks,
    setTasks,
  }
  return <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
