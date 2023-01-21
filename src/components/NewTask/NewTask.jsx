import React, { useEffect } from "react";
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
import useAuthContext from "../../hooks/useAuthContext";
import Select from "react-select";
import { getTags } from "../../utils/utils";

function NewTask() {
  const [newTask, setNewTask] = useState({ task: "", due_date: "", description: "" });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionsLoader, setOptionsLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    displayAllTags();
  }, []);

  const displayAllTags = async () => {
    setOptionsLoader(true);
    try {
      const response = await getTags();
      const options = response.data.map(({ id, tag_name }) => ({
        value: id,
        label: tag_name,
      }));
      setOptions(options);
    } catch (err) {
      console.log(err);
    }
    setOptionsLoader(false);
  };

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const userId = user.id;

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
      await api.post(`/api/tasks`, { ...newTask, user_id: userId });
      setNewTask({ task: "", due_date: "", description: "" });
      navigate("/dashboard/tasks", { state: { show: true, msg: "New Task has been Added", className: "notification-added" } });
    } catch (err) {
      setError([...error, err.response.data.errors]);
      setLoading(false);
    }
  };

  const handleChange = (option) => {
    if (option.length <= 3) {
      setSelectedOptions(option);
      setError([]);
    } else {
      setError([{ tags: "Only 3 tags can be added" }]);
    }
  };

  const closeHandler = () => {
    setError([]);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="dashboard-form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={4} className="form-background">
            <Form className="custom-form" onSubmit={handleSubmit}>
              <h4 className="task-form-title">Add New Task</h4>
              <Form.Group className="my-4" controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control name="task" placeholder="Task" value={newTask.task} onChange={handleTaskForm} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("task") ? <Alerts closeHandler={closeHandler} text={error[0].task[0]} variant="danger" /> : ""}
              <Form.Group className="my-4">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" maxLength={50} onChange={handleTaskForm} value={newTask.description} />
                <span className="d-flex justify-content-end count-text">{newTask.description.length} / 50 </span>
              </Form.Group>
              <Form.Group className="my-4" controlId="due_date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" placeholder="Due Date" min={new Date().toISOString().split("T")[0]} onChange={handleTaskForm} value={newTask.due_date} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts closeHandler={closeHandler} text={error[0].due_date[0]} variant="danger" /> : ""}
              <Form.Group className="my-4" controlId="tag">
                <Form.Label>Tags</Form.Label>
                <Select isSearchable={false} value={selectedOptions} onChange={handleChange} options={options} isMulti={true} isLoading={optionsLoader} />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("tags") ? <Alerts closeHandler={closeHandler} text={error[0].tags} variant="danger" /> : ""}
              <div className="my-4 d-grid gap-2">
                <Button className="btn--primary  btn-lg" type="submit">
                  Add
                </Button>
              </div>
              <Link to={-1}>Back</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewTask;
