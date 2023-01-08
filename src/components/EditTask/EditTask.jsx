import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import Alerts from "../Alerts/Alerts";
import { checkObjectChangeCount } from "../../utils/utils";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { handleTaskDeleteResponse } from "../../utils/utils";

const EditTask = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [editTask, setEditTask] = useState({ task: "", due_date: "", status: "" });
  const [loading, setLoading] = useState(true);
  const [existingEditTask, setExistingEditTask] = useState({});
  const [error, setError] = useState([]);
  const [count, setCount] = useState(0);

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

  const handleTaskDelete = (id) => {
    setLoading(true);
    handleTaskDeleteResponse(id)
      .then((response) => {
        if (response.status === 200) {
          navigate("/dashboard/tasks", { state: { show: true, msg: "Task has been deleted" } });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="dashboard-form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={4} className="form-background">
            <h5 className="task-form-title">Edit Task</h5>
            <Form className="custom-form" onSubmit={handleTaskUpdate}>
              <Form.Group className="my-4" controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control name="task" placeholder="Task" onChange={handleEditTask} value={editTask.task} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("task") ? <Alerts text={error[0].task[0]} variant="danger" /> : ""}
              <Form.Group className="my-4" controlId="due_date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" placeholder="Due Date" value={editTask.due_date} onChange={handleEditTask} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts text={error[0].due_date[0]} variant="danger" /> : ""}
              <Form.Group className="my-4" controlId="status">
                <Form.Check type="checkbox" name="status" checked={editTask.status} onChange={handleEditTask} label="Status" />
              </Form.Group>
              <div className="my-4 d-flex justify-content-center align-items-baseline">
                <Button disabled={count === 0 ? true : false} className="btn--primary mx-2" type="submit">
                  Update
                </Button>
                <Button className="btn btn-danger btn--delete" onClick={() => handleTaskDelete(id)}>
                  Delete
                </Button>
              </div>
              <Link to="/dashboard/tasks">Back</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditTask;
