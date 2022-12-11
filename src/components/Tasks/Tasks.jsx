import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { updateTaskStatusApi } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./tasks.css";
import PlusIcon from "../../assets/Icons/PlusIcon";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTasks();
    if (location.state !== null) {
      setShow(true);
      setSuccess(location.state.msg);
    }
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tasks");
      setTasks([...response.data.tasks]);
      const pendingTasks = response.data.tasks.filter((task) => task.status === 0);
      const completedTasks = response.data.tasks.filter((task) => task.status === 1);
      setPendingTasks(pendingTasks);
      setCompletedTasks(completedTasks);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id) => {
    setLoading(true);
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return { ...task };
        }
      });
      setTasks([...updatedTasks]);
      const updatedResponse = await updateTaskStatusApi(id);
      setCompletedTasks([...updatedResponse.data.completed]);
      setPendingTasks([...updatedResponse.data.pending]);
      setLoading(false);
    } catch (err) {}
  };

  const handleTaskDelete = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/api/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      if (response.status === 200) {
        setSuccess("Task has been Deleted");
      }
      setTasks([...filteredTasks]);
      setShow(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer position="top-end">
        <Toast
          onClose={() => {
            setShow(false);
            window.history.replaceState({}, document.title);
          }}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Body> {success}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="tasks-wrapper">
        <p className="heading">Tasks</p>
        <p>Manage Your Tasks</p>
        <div className="tasks-in-progress mt-3">
          <p className="pending-tasks">Pending ({pendingTasks.length})</p>
          {pendingTasks.map((task) => (
            <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
          ))}
          <div className="task-item">
            <PlusIcon />
            <Link to="/dashboard/tasks/new" className="add-new-task-link">
              Add new task
            </Link>
          </div>
        </div>
        <div className="tasks-in-progress mt-3">
          <p className="pending-tasks">Completed ({completedTasks.length})</p>
          {completedTasks.map((task) => (
            <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Tasks;
