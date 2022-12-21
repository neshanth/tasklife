import React from "react";
import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { useLocation } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import "./tasks.css";
import AddTask from "../AddTask/AddTask";

function Tasks({ getTasks, loading, completedTasks, pendingTasks, updateTaskStatus, setShow, setSuccess, show, success, handleTaskDelete }) {
  const location = useLocation();

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
      <p className="heading">Tasks</p>
      <p>Create, Read, Update and Delete Your Tasks.</p>
      <div className="tasks-in-progress mt-3">
        <p className="sub-heading">Pending ({pendingTasks.length})</p>
        {pendingTasks.map((task) => (
          <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
        ))}
      </div>
      <AddTask />
      <div className="tasks-in-progress mt-3">
        <p className="sub-heading">Completed ({completedTasks.length})</p>
        {completedTasks.map((task) => (
          <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />
        ))}
      </div>
    </>
  );
}

export default Tasks;
