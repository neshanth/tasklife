import React, { useState, useEffect } from "react";
import Home from "../Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import Tasks from "../Tasks/Tasks";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import api from "../../api/api";
import EditTask from "../EditTask/EditTask";
import NewTask from "../NewTask/NewTask";
import Stats from "../Stats/Stats.jsx";
import { getTasksResponse, renderToast, updateTaskStatusApi } from "../../utils/utils";
import Spinner from "../Spinner/Spinner";
import useAuthContext from "../../hooks/useAuthContext";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const { setAuth, authLoader, setAuthLoader, setUser } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setAuthLoader(true);
    try {
      const response = await api.get("/api/user");
      const { id, name } = response.data;
      setAuth(true);
      setUser({ id, name });
    } catch (err) {
      setAuth(false);
    }
    setAuthLoader(false);
  };

  const getTasks = () => {
    setLoading(true);
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

  if (authLoader) return <Spinner />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/stats" element={<Stats tasks={tasks} updateTaskStatus={updateTaskStatus} />} />
            <Route
              path="/dashboard/tasks"
              element={<Tasks getTasks={getTasks} loading={loading} tasks={tasks} updateTaskStatus={updateTaskStatus} setShow={setShow} setSuccess={setSuccess} show={show} success={success} />}
            />
            <Route path="/dashboard/tasks/edit/:id" element={<EditTask />} />
            <Route path="/dashboard/tasks/new" element={<NewTask />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
};

export default TaskManager;
