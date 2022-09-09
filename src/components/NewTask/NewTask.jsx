import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const [newTask, setNewTask] = useState({ task: "", due_date: "" });

  const navigate = useNavigate();

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
      await api.post(`/api/tasks`, { ...newTask });
      setNewTask({ task: "", due_date: "" });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="my-2 text-center text--primary">New Task</h2>
      <Form className="custom-form edit-form" onSubmit={handleSubmit}>
        <Form.Group className="my-4" controlId="task">
          <Form.Control name="task" placeholder="Task" value={newTask.task} onChange={handleTaskForm} />
        </Form.Group>
        <Form.Group className="my-4" controlId="due_date">
          <Form.Control type="date" name="due_date" placeholder="Due Date" onChange={handleTaskForm} value={newTask.due_date} />
        </Form.Group>
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
