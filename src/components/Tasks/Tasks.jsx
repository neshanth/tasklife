import React from "react";
import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { useLocation } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./tasks.css";
import AddTask from "../AddTask/AddTask";

function Tasks({ getTasks, loading, updateTaskStatus, setShow, setSuccess, show, success, handleTaskDelete, tasks }) {
  const location = useLocation();
  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);

  useEffect(() => {
    getTasks();
    if (location.state !== null) {
      setShow(true);
      setSuccess(location.state.msg);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer position="top-end">
        <Toast
          className={`${(location.state && location.state.className) || ""}`}
          onClose={() => {
            setShow(false);
            window.history.replaceState({}, document.title);
          }}
          show={show}
          delay={5000}
          autohide
        >
          <Toast.Body> {success}</Toast.Body>
        </Toast>
      </ToastContainer>
      <p className="dashboard-heading">Tasks</p>
      <p>Create, Read, Update and Delete Your Tasks. Update the status of your task by toggling the button to the left of the task</p>
      <div className="tasks-in-progress dashboard-section">
        <p className="dashboard-sub-heading">Pending ({pendingTasks.length})</p>
        {pendingTasks.map((task) => (
          <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
        ))}
        <AddTask />
      </div>

      <div className="tasks-in-progress dashboard-section">
        <p className="dashboard-sub-heading">Completed ({completedTasks.length})</p>
        {completedTasks.map((task) => (
          <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
        ))}
      </div>
    </>
  );
}

export default Tasks;
