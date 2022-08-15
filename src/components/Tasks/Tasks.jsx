import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import api from "../../api/api";
import EditIcon from "../Icons/EditIcon";
import { Link } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await api.get("/api/tasks");
      setTasks([...response.data.tasks]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="my-2">
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
            return (
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{task.task}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>
                  <Link to="/">
                    <EditIcon />
                  </Link>
                  <Link to="/"></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default Tasks;
