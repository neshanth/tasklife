import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import MainContent from "../MainContent/MainContent.jsx";
import Tasks from "../Tasks/Tasks";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import api from "../../api/api";
import EditTask from "../EditTask/EditTask";
import NewTask from "../NewTask/NewTask";
import Stats from "../Stats/Stats.jsx";
import { getTasksResponse, renderToast, updateTaskStatusApi, handleTaskDeleteResponse } from "../../utils/utils";
import Spinner from "../Spinner/Spinner";
import useAppContext from "../../hooks/useAppContext";

const TaskManager = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const appPath = "/app";
  const { setAuth, authLoader, setAuthLoader, setUser, loading, setLoading, setFetchData, setAllTags } = useAppContext();

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

  const updateTaskStatus = async (id) => {
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

  const handleTaskDelete = async (id) => {
    const tasksCopy = [...tasks];
    setTasks(tasks.filter((task) => task.id !== id));
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

  if (authLoader) return <Spinner />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path={appPath} element={<MainContent />}>
            <Route
              path={`${appPath}/tasks`}
              element={<Tasks tasks={tasks} setTasks={setTasks} getTasks={getTasks} loading={loading} updateTaskStatus={updateTaskStatus} handleTaskDelete={handleTaskDelete} />}
            />
            <Route path={`${appPath}/stats`} element={<Stats tasks={tasks} updateTaskStatus={updateTaskStatus} />} />
            <Route path={`${appPath}/tasks/edit/:id`} element={<EditTask tasks={tasks} handleTaskDelete={handleTaskDelete} />} />
            <Route path={`${appPath}/tasks/new`} element={<NewTask />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
};

export default TaskManager;
