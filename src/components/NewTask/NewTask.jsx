import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Alerts from "../Alerts/Alerts";
import Spinner from "../Spinner/Spinner";
import { TaskContext } from "../../context/taskContext";

function NewTask() {
  const [newTask, setNewTask] = useState({ task: "", due_date: "" });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await api.post(`/api/tasks`, { ...newTask, user_id: userId.id });
      setNewTask({ task: "", due_date: "" });
      navigate("/dashboard/tasks", { state: { show: true, msg: "New Task has been Added" } });
    } catch (err) {
      setError([...error, err.response.data.errors]);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="dashboard-form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={4} className="form-background">
            <Form className="custom-form edit-form" onSubmit={handleSubmit}>
              <h4 className="task-form-title">Add New Task</h4>
              <Form.Group className="my-3" controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control name="task" placeholder="Task" value={newTask.task} onChange={handleTaskForm} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("task") ? <Alerts text={error[0].task[0]} variant="danger" /> : ""}
              <Form.Group className="my-3" controlId="due_date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" placeholder="Due Date" onChange={handleTaskForm} value={newTask.due_date} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts text={error[0].due_date[0]} variant="danger" /> : ""}
              <div className="my-3 d-grid gap-2">
                <Button className="btn--primary btn btn-primary btn-lg" variant="primary" type="submit">
                  Save
                </Button>
              </div>
              <Link to="/dashboard/tasks">Back</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewTask;
