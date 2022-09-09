import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "./editTask.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../context";

const EditTask = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [editTask, setEditTask] = useState({ task: "", due_date: "", status: "" });
  const { loading, setLoading } = useContext(UserContext);
  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tasks/${id}`);
      const { task, status, due_date } = response.data;
      setEditTask({ task, status, due_date });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleEditTask = (e) => {
    const target = e.target;
    const name = target.name;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }
    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleTaskUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/api/tasks/${id}`, editTask);
      setEditTask({ task: "", due_date: "", status: "" });
      setLoading(false);
      navigate(-1);
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
      <h2 className="my-2 text-center text--primary">Edit Task</h2>
      <Form className="custom-form edit-form" onSubmit={handleTaskUpdate}>
        <Form.Group className="my-4" controlId="task">
          <Form.Control name="task" placeholder="Task" onChange={handleEditTask} value={editTask.task} />
        </Form.Group>
        <Form.Group className="my-4" controlId="due_date">
          <Form.Control type="date" name="due_date" placeholder="Due Date" value={editTask.due_date} onChange={handleEditTask} />
        </Form.Group>
        <Form.Group className="my-4" controlId="status">
          <Form.Check type="checkbox" name="status" checked={editTask.status} onChange={handleEditTask} label="Status" />
        </Form.Group>
        <div className="my-4 d-flex justify-content-center align-items-baseline">
          <Button className="btn--primary mx-2" variant="primary" type="submit">
            Update
          </Button>
          <Button onClick={() => navigate("/dashboard/tasks")} className="btn-warning mx-2" variant="primary" type="submit">
            Back
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditTask;
