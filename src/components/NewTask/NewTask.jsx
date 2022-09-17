import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Spinner } from "react-bootstrap";
import Alerts from "../Alerts/Alerts";

function NewTask() {
  const [newTask, setNewTask] = useState({ task: "", due_date: "" });
  const { loading, setLoading } = useContext(UserContext);
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));

  const handleTaskForm = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/tasks`, { ...newTask, user_id: userId.id });
      setNewTask({ task: "", due_date: "" });
      navigate("/dashboard/tasks", { state: { show: true, msg: "New Task has been Added" } });
    } catch (err) {
      setError([...error, err.response.data.errors]);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="my-2 text-center text--primary">New Task</h2>
      <Form className="custom-form edit-form" onSubmit={handleSubmit}>
        <Form.Group className="my-4" controlId="task">
          <Form.Control name="task" placeholder="Task" value={newTask.task} onChange={handleTaskForm} required />
        </Form.Group>
        {error.length > 0 && error[0].hasOwnProperty("task") ? <Alerts text={error[0].task[0]} variant="danger" /> : ""}
        <Form.Group className="my-4" controlId="due_date">
          <Form.Control type="date" name="due_date" placeholder="Due Date" onChange={handleTaskForm} value={newTask.due_date} required />
        </Form.Group>
        {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts text={error[0].due_date[0]} variant="danger" /> : ""}
        <div className="my-4 d-flex justify-content-center align-items-baseline">
          <Button className="btn--primary mx-2" variant="primary" type="submit">
            Save
          </Button>
          <Button onClick={() => navigate("/dashboard/tasks")} className="btn-warning mx-2" variant="primary" type="submit">
            Back
          </Button>
        </div>
      </Form>
    </>
  );
}

export default NewTask;
