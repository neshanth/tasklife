import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import TaskItem from "../TaskItem/TaskItem";
import { useContext } from "react";
import { UserContext } from "../../context";
import Spinner from "../Spinner/Spinner";
import { updateTaskStatusApi } from "../../utils/utils";

function Tasks() {
  const effectRan = useRef(false);
  const [tasks, setTasks] = useState([]);
  const { loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    if (effectRan.current === false) {
      getTasks();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tasks");
      setTasks([...response.data.tasks]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return { ...task };
        }
      });
      setTasks([...updatedTasks]);
      updateTaskStatusApi(id);
    } catch (err) {}
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className="text-center text--primary my-2">Tasks</h2>
      <Container>
        <Row className="justify-content-center">
          <Col lg={3}>
            <h4>Completed : 4</h4>
          </Col>
          <Col lg={3}>
            <h4>Pending : 5</h4>
          </Col>
        </Row>
      </Container>
      <Table className="my-2" striped bordered responsive>
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Task</th>
            <th className="text-center">Description</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} />;
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Tasks;
