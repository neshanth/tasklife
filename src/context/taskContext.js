import React, { createContext, useState } from "react";
import { getTasksResponse, handleTaskDeleteResponse, updateTaskStatusApi } from "../utils/utils";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const getTasks = () => {
    setLoading(true);
    getTasksResponse()
      .then((response) => {
        setTasks([...response.data.tasks]);
        const pendingTasks = response.data.tasks.filter((task) => task.status === 0);
        const completedTasks = response.data.tasks.filter((task) => task.status === 1);
        setPendingTasks(pendingTasks);
        setCompletedTasks(completedTasks);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const updateTaskStatus = (id) => {
    setLoading(true);
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status: task.status === 1 ? 0 : 1 } : { ...task }));
    setTasks([...updatedTasks]);
    updateTaskStatusApi(id)
      .then((response) => {
        setCompletedTasks([...response.data.completed]);
        setPendingTasks([...response.data.pending]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleTaskDelete = (id) => {
    setLoading(true);
    handleTaskDeleteResponse(id)
      .then((response) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        if (response.status === 200) {
          setSuccess("Task has been Deleted");
        }
        setTasks([...filteredTasks]);
        setCompletedTasks([...filteredTasks.filter((task) => task.status === 1)]);
        setPendingTasks([...filteredTasks.filter((task) => task.status === 0)]);
        setShow(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <TaskContext.Provider value={{ getTasks, loading, tasks, completedTasks, pendingTasks, updateTaskStatus, show, setShow, success, setSuccess, handleTaskDelete, setLoading }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
