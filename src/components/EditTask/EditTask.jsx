import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "./editTask.css";

const EditTask = () => {
  return (
    <>
      <h2 className="my-2 text-center text--primary">Edit Task</h2>
      <Form className="custom-form edit-form">
        <Form.Group className="my-4" controlId="task">
          <Form.Control type="input" name="task" placeholder="Task" />
        </Form.Group>
        <Form.Group className="my-4" controlId="description">
          <Form.Control type="text" name="description" placeholder="Description" />
        </Form.Group>
        <Form.Group className="my-4" controlId="description">
          <Form.Control type="date" name="due_date" placeholder="Due Date" />
        </Form.Group>
        <Form.Group className="my-4" controlId="status">
          <InputGroup>
            <InputGroup.Checkbox checked={true} name="status" />
            <Form.Control placeholder="status" />
          </InputGroup>
        </Form.Group>
        <div className="my-4 d-flex justify-content-center align-items-baseline">
          <Button className="btn--primary mx-2" variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditTask;
