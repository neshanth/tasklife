import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getTasksResponse, renderToast, updateTaskStatusApi, handleTaskDeleteResponse } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import api from "../../api/api";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import MainContent from "../MainContent/MainContent.jsx";
import Inbox from "../Inbox/Inbox.jsx";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Spinner from "../Spinner/Spinner";
import Sidebar from "../Sidebar/Sidebar.jsx";
import history from "../../history/history.js";
import TaskForm from "../TaskForm/TaskForm.jsx";
import Today from "../Today/Today.jsx";

const TaskManager = () => {
  const appPath = "/app";
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const { auth, setAuth, authLoader, setAuthLoader, tasks, setTasks, setUser, loading, setLoading, setFetchData, setAllTags, filters, setFilters } = useAppContext();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);

  useEffect(() => {
    checkAuth();
    getAllTags();
  }, []);

  useEffect(() => {
    if (auth) {
      getTasks();
    }
  }, [auth]);

  useEffect(() => {
    let currentTasks = [...tasks];
    // Status Filter
    if (filters.status === "pending") {
      currentTasks = currentTasks.filter((task) => task.status === 0);
    } else if (filters.status === "completed") {
      currentTasks = currentTasks.filter((task) => task.status === 1);
    }
    // Date Filter
    if (filters.date) {
      const filterDate = new Date(filters.date.getTime() - filters.date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      currentTasks = currentTasks.filter((task) => {
        const taskDate = task.due_date;
        return taskDate === filterDate;
      });
    }
    // Tag Filter
    if (filters.tags.length > 0) {
      currentTasks = currentTasks.filter((task) => task.tags.some((tag) => filters.tags.includes(tag.label)));
    }

    //Search
    if (filters.search) {
      currentTasks = currentTasks.filter((task) => task.task.toLowerCase().includes(filters.search.toLowerCase()));
    }

    setFilteredTasks(currentTasks);
  }, [filters, tasks]);

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName === `${appPath}/today`) {
      setFilters({ ...filters, status: "", date: new Date() });
    } else if (pathName === `${appPath}/inbox`) {
      setFilters({ ...filters, status: "pending", date: "" });
    }
  }, [location]);

  const checkAuth = async () => {
    setAuthLoader(true);
    try {
      const response = await api.get("/api/user");
      const { id, name, email } = response.data;
      setAuth(true);
      setUser({ id, name, email });
      //getTasks();
    } catch (err) {
      setAuth(false);
    }
    setAuthLoader(false);
  };

  const getTasks = (loading = true) => {
    setLoading(loading);
    getTasksResponse()
      .then((response) => {
        setTasks([...response.data.tasks]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getAllTags = async () => {
    try {
      const response = await api.get("/api/tags");
      setAllTags(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskStatus = async (e, id) => {
    e.stopPropagation();
    const taskBeforeUpdate = tasks.find((task) => task.id === id);
    try {
      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status: task.status === 1 ? 0 : 1 } : { ...task }));
      setTasks([...updatedTasks]);
      await updateTaskStatusApi(id);
    } catch (err) {
      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status: taskBeforeUpdate.status } : { ...task }));
      setTasks([...updatedTasks]);
      renderToast(err.response.data.error, "error");
    }
  };

  const handleTaskDelete = async (e, id) => {
    e.stopPropagation();
    const tasksCopy = [...tasks];
    setTasks(tasks.filter((task) => task.id !== Number(id)));
    try {
      const response = await handleTaskDeleteResponse(id);
      if (response.status === 200) {
        renderToast("Task Deleted", "error");
        setFetchData(true);
        getTasks(false);
      }
    } catch (err) {
      renderToast(err.response.data, "error");
      setTasks(tasksCopy);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      let response = await api.post("/api/logout", {});
      if (response.status === 200) {
        setAuth(false);
        setLoading(false);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const taskFormProps = {
    getTasks,
    tasks,
    setTasks,
    updateTaskStatus,
    handleTaskDelete,
  };

  if (authLoader) return <Spinner />;

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path={appPath} element={<MainContent />}>
            <Route path={`${appPath}/dashboard`} element={<Dashboard tasks={tasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />} />
            <Route
              path={`${appPath}/inbox`}
              element={
                <Inbox
                  tasks={filteredTasks}
                  setTasks={setTasks}
                  getTasks={getTasks}
                  loading={loading}
                  updateTaskStatus={updateTaskStatus}
                  handleTaskDelete={handleTaskDelete}
                  pendingTasks={pendingTasks}
                  completedTasks={completedTasks}
                />
              }
            />
            <Route
              path={`${appPath}/today`}
              element={
                <Today
                  // pendingTasks={pendingTasks.filter((task) => new Date(task.due_date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0])}
                  // completedTasks={completedTasks.filter((task) => new Date(task.due_date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0])}
                  handleTaskDelete={handleTaskDelete}
                  updateTaskStatus={updateTaskStatus}
                  isToday={true}
                  tasks={filteredTasks.filter((task) => new Date(task.due_date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0])}
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={`${appPath}/tasks/:id`} element={<TaskForm {...taskFormProps} />} />
          <Route path={`${appPath}/tasks/add`} element={<TaskForm {...taskFormProps} />} />
          <Route path={`${appPath}/tasks/edit/:id`} element={<TaskForm {...taskFormProps} />} />
        </Routes>
      )}
      {auth && <Sidebar logout={logout} />}
    </>
  );
};

export default TaskManager;
