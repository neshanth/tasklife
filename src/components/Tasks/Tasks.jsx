import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { updateTaskStatusApi } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom";
import { Toast, ToastContainer, Table } from "react-bootstrap";
import "./tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return { ...task };
        }
      });
      setTasks([...updatedTasks]);
      updateTaskStatusApi(id);
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
        <div className="table-heading d-flex justify-content-between">
          <p className="table-header">Tasks</p>
          <Link to="/dashboard/tasks/new">
            <button className="btn btn--primary">New Task</button>
          </Link>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Task</th>
              <th scope="col">Due Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />;
            })}
          </tbody>
        </Table>
        <div className="new-btn d-flex justify-content-center"></div>
      </div>
    </>
  );
}

export default Tasks;
