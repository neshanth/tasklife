import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import { checkObjectChangeCount } from "../../utils/utils";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getTags, renderToast } from "../../utils/utils";
import useAuthContext from "../../hooks/useAuthContext";

const EditTask = ({ handleTaskDelete }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading, setFetchData } = useAuthContext();
  const [editTask, setEditTask] = useState({ task: "", due_date: "", status: "", description: "" });
  const [existingEditTask, setExistingEditTask] = useState({});
  const [count, setCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsLoader, setOptionsLoader] = useState(false);
  const [prevOptions, setPrevOptions] = useState([]);

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    setLoading(true);
    setOptionsLoader(true);
    try {
      const response = await api.get(`/api/tasks/${id}`);
      const getTagsForTask = await api.get(`/api/tags/${id}`);
      const allTags = await getTags();
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
      setPrevOptions(options);
      setOptions(allOptions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    setOptionsLoader(false);
  };

  const handleChange = (option) => {
    if (option.length <= 3) {
      setSelectedOptions(option);
    } else {
      renderToast("Only 3 tags can be added", "error");
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
      await api.post(`/api/tags/add/${id}`, { tagIds: selectedOptions.map((option) => option.value) });
      setEditTask({ task: "", due_date: "", status: "", description: "" });
      setFetchData(true);
      navigate("/dashboard/tasks");
      renderToast("Task Updated", "success");
    } catch (err) {
      const errorsList = Object.values(err.response.data.errors).flat();
      errorsList.forEach((err) => renderToast(err, "error"));
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
              <Form.Group className="my-4" controlId="due_date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" min={new Date().toISOString().split("T")[0]} name="due_date" placeholder="Due Date" value={editTask.due_date} onChange={handleEditTask} required />
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" maxLength={150} onChange={handleEditTask} value={editTask.description ? editTask.description : ""} />
                <span className={`d-flex justify-content-end count-text ${editTask.description?.length === 150 && "count-text-danger"}`}>
                  {editTask.description ? editTask.description.length : 0} / 150{" "}
                </span>
              </Form.Group>
              <Form.Group className="my-4" controlId="tag">
                <Form.Label>Tags</Form.Label>
                <Select classNamePrefix="react-select" isSearchable={false} value={selectedOptions} onChange={handleChange} options={options} isMulti={true} isLoading={optionsLoader} />
              </Form.Group>
              <Form.Group className="my-4" controlId="status">
                <Form.Check type="checkbox" name="status" checked={editTask.status} onChange={handleEditTask} label="Status" />
              </Form.Group>
              <div className="my-4 d-flex justify-content-center align-items-baseline">
                <Button disabled={count === 0 && JSON.stringify(prevOptions) === JSON.stringify(selectedOptions) ? true : false} className="btn--primary mx-2" type="submit">
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
