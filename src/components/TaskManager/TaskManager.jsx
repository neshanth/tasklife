import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getTasksResponse, renderToast, updateTaskStatusApi, handleTaskDeleteResponse } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import api from "../../api/api";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import MainContent from "../MainContent/MainContent.jsx";
import Tasks from "../Tasks/Tasks";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Stats from "../Stats/Stats.jsx";
import Spinner from "../Spinner/Spinner";
import Sidebar from "../Sidebar/Sidebar.jsx";
import history from "../../history/history.js";
import TaskForm from "../TaskForm/TaskForm.jsx";
import Inbox from "../Inbox/Inbox.jsx";

const TaskManager = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const [tasks, setTasks] = useState([]);
  const appPath = "/app";
  const { auth, setAuth, authLoader, setAuthLoader, setUser, loading, setLoading, setFetchData, setAllTags, resetTaskData } = useAppContext();
  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);

  useEffect(() => {
    checkAuth();
    getAllTags();
  }, []);

  const checkAuth = async () => {
    setAuthLoader(true);
    try {
      const response = await api.get("/api/user");
      const { id, name, email } = response.data;
      setAuth(true);
      setUser({ id, name, email });
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

  if (authLoader) return <Spinner />;

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path={appPath} element={<MainContent />}>
            <Route
              path={`${appPath}/tasks`}
              element={
                <Tasks
                  tasks={tasks}
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
            <Route path={`${appPath}/stats`} element={<Stats tasks={tasks} updateTaskStatus={updateTaskStatus} />} />
            <Route
              path={`${appPath}/inbox`}
              element={
                <Inbox
                  pendingTasks={pendingTasks.filter((task) => new Date(task.due_date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0])}
                  completedTasks={completedTasks.filter((task) => new Date(task.due_date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0])}
                  handleTaskDelete={handleTaskDelete}
                  updateTaskStatus={updateTaskStatus}
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={`${appPath}/tasks/:id`} element={<TaskForm handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} tasks={tasks} getTasks={getTasks} setTasks={setTasks} />} />
          <Route path={`${appPath}/tasks/add`} element={<TaskForm handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} tasks={tasks} getTasks={getTasks} setTasks={setTasks} />} />
          <Route
            path={`${appPath}/tasks/edit/:id`}
            element={<TaskForm handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} tasks={tasks} getTasks={getTasks} setTasks={setTasks} />}
          />
        </Routes>
      )}
      {auth && <Sidebar logout={logout} />}
    </>
  );
};

export default TaskManager;
