import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "./editTask.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import Alerts from "../Alerts/Alerts";
import { checkObjectChangeCount } from "../../utils/utils";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/col";
import Container from "react-bootstrap/Container";

const EditTask = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [editTask, setEditTask] = useState({ task: "", due_date: "", status: "" });
  const [existingEditTask, setExistingEditTask] = useState({});
  const [error, setError] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tasks/${id}`);
      const { task, status, due_date } = response.data;
      setExistingEditTask({ task, status, due_date });
      setEditTask({ task, status, due_date });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleEditTask = (e) => {
    const target = e.target;
    const name = target.name;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
      value = target.checked === true ? 1 : 0;
    } else {
      value = target.value;
    }
    setEditTask({
      ...editTask,
      [name]: value,
    });
    setCount(checkObjectChangeCount(existingEditTask, { ...editTask, [name]: value }));
  };

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/api/tasks/${id}`, editTask);
      setEditTask({ task: "", due_date: "", status: "" });
      setLoading(false);
      navigate("/dashboard/tasks", { state: { show: true, msg: "Task has been updated" } });
    } catch (err) {
      console.log(err);
      setError([...error, err.response.data.errors]);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center align-items-center mt-6">
          <Col md={6} className="form-background">
            <h5 className="text-center task-form-title">Edit Task</h5>
            <Form className="custom-form edit-form" onSubmit={handleTaskUpdate}>
              <Form.Group className="my-4" controlId="task">
                <Form.Control name="task" placeholder="Task" onChange={handleEditTask} value={editTask.task} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("task") ? <Alerts text={error[0].task[0]} variant="danger" /> : ""}
              <Form.Group className="my-4" controlId="due_date">
                <Form.Control type="date" name="due_date" placeholder="Due Date" value={editTask.due_date} onChange={handleEditTask} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts text={error[0].due_date[0]} variant="danger" /> : ""}
              <Form.Group className="my-4" controlId="status">
                <Form.Check type="checkbox" name="status" checked={editTask.status} onChange={handleEditTask} label="Status" />
              </Form.Group>
              <div className="my-4 d-flex justify-content-center align-items-baseline">
                <Button disabled={count === 0 ? true : false} className="btn--primary mx-2" variant="primary" type="submit">
                  Update
                </Button>
                <Button onClick={() => navigate("/dashboard/tasks")} className="btn-warning mx-2" variant="primary">
                  Back
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditTask;
