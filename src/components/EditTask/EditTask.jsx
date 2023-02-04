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
import Select from "react-select";
import { getTags } from "../../utils/utils";

const EditTask = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [editTask, setEditTask] = useState({ task: "", due_date: "", status: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [existingEditTask, setExistingEditTask] = useState({});
  const [error, setError] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsLoader, setOptionsLoader] = useState(false);

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tasks/${id}`);
      const getTagsForTask = await api.get(`/api/tags/${id}`);
      const allTags = await getTags();
      console.log(allTags);
      const allOptions = allTags.data.map(({ id, tag_name }) => ({
        value: id,
        label: tag_name,
      }));
      const { task, status, due_date, description } = response.data;
      const options = getTagsForTask.data.map(({ id, tag_name }) => ({
        value: id,
        label: tag_name,
      }));
      setExistingEditTask({ task, status, due_date, description });
      setEditTask({ task, status, due_date, description });
      setSelectedOptions(options);
      setOptions(allOptions);
      setLoading(false);
    } catch (err) {
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
      await api.post(`/api/tags/add/${id}`, { tagIds: selectedOptions.map((option) => option.value) });
      setEditTask({ task: "", due_date: "", status: "", description: "" });
      navigate("/dashboard/tasks", { state: { show: true, msg: "Task has been updated", className: "notification-success" } });
    } catch (err) {
      console.log(err);
      setError([...error, err.response.data.errors]);
      setLoading(false);
    }
  };

  const handleTaskDelete = async (id) => {
    setLoading(true);
    try {
      const response = await handleTaskDeleteResponse(id);
      if (response.status === 200) {
        navigate("/dashboard/tasks", { state: { show: true, msg: "Task has been deleted", className: "notification-danger" } }, () => setLoading(false));
      }
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
                <Form.Control type="date" min={new Date().toISOString().split("T")[0]} name="due_date" placeholder="Due Date" value={editTask.due_date} onChange={handleEditTask} required />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("due_date") ? <Alerts text={error[0].due_date[0]} variant="danger" /> : ""}
              <Form.Group className="my-4">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" onChange={handleEditTask} value={editTask.description ? editTask.description : ""} />
                <span className="d-flex justify-content-end count-text">{editTask.description ? editTask.description.length : 0} / 50 </span>
              </Form.Group>
              <Form.Group className="my-4" controlId="tag">
                <Form.Label>Tags</Form.Label>
                <Select classNamePrefix="react-select" isSearchable={false} value={selectedOptions} onChange={handleChange} options={options} isMulti={true} isLoading={optionsLoader} />
              </Form.Group>
              {error.length > 0 && error[0].hasOwnProperty("tags") ? <Alerts closeHandler={closeHandler} text={error[0].tags} variant="danger" /> : ""}
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
              <Link to={-1}>Back</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditTask;
