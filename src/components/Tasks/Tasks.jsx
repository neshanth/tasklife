import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Tasks() {
  return (
    <Container className="my-2">
      <h2 className="text-center text--primary">Tasks</h2>
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
      <Table className="my-2" striped>
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Task</th>
            <th className="text-center">Due Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
}

export default Tasks;
