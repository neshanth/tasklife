import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import useAppContext from "../../hooks/useAppContext";
import Select from "react-select";
import { getTags, handleDateIfDateIsEmpty, renderToast } from "../../utils/utils";

function NewTask() {
  const { loading, setLoading, setFetchData, allTags } = useAppContext();
  const [newTask, setNewTask] = useState({ task: "", due_date: "", description: "" });
  const [optionsLoader, setOptionsLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setOptions(allTags);
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
  const { user } = useAppContext();
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
      if (newTask.due_date === "") {
        newTask.due_date = handleDateIfDateIsEmpty();
      }
      const response = await api.post(`/api/tasks`, { ...newTask, user_id: userId });
      await api.post(`/api/tags/add/${response.data.id}`, { tagIds: selectedOptions.map((option) => option.value) });
      setNewTask({ task: "", due_date: "", description: "" });
      setFetchData(true);
      navigate("/app/tasks");
      renderToast("New Task Added", "success");
    } catch (err) {
      setLoading(false);
      const errorsList = Object.values(err.response.data.errors).flat();
      errorsList.forEach((err) => renderToast(err, "error"));
    }
  };

  const handleChange = (option) => {
    if (option.length <= 3) {
      setSelectedOptions(option);
    } else {
      renderToast("Only 3 tags can be added", "error");
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
            <Form className="custom-form" onSubmit={handleSubmit}>
              <h4 className="task-form-title">Add New Task</h4>
              <Form.Group className="my-4" controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control name="task" placeholder="Task" value={newTask.task} onChange={handleTaskForm} required />
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" maxLength={150} onChange={handleTaskForm} value={newTask.description} />
                <span className={`d-flex justify-content-end count-text ${newTask.description.length === 150 && "count-text-danger"}`}>{newTask.description.length} / 150 </span>
              </Form.Group>
              <Form.Group className="my-4" controlId="due_date">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" placeholder="Due Date" min={new Date().toISOString().split("T")[0]} onChange={handleTaskForm} value={newTask.due_date} />
              </Form.Group>
              <Form.Group className="my-4" controlId="tag">
                <Form.Label>Tags</Form.Label>
                <Select classNamePrefix="react-select" isSearchable={false} value={selectedOptions} onChange={handleChange} options={options} isMulti={true} isLoading={optionsLoader} />
              </Form.Group>
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
