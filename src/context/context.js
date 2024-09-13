import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const TASK_DATA = {
    task: "",
    description: "",
    due_date: "",
    tags: [],
    id: "",
    status: 0
  }
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
  const [taskData, setTaskData] = useState(TASK_DATA)
  const [taskFormAction, setTaskFormAction] = useState('create')
  const isMobile = useIsMobile()
  const handleMobileNavToggle = () => {
    setShowMobileNav(!showMobileNav);
  };
  const resetTaskData = () => {
    setTaskData(TASK_DATA)
  }
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
    taskData,
    setTaskData,
    taskFormAction,
    setTaskFormAction,
    resetTaskData
  }
  return <UserContext.Provider value={valueObj}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
