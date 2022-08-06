import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Register() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} className="form-background">
          <Form className="register-form">
            <Form.Group className="my-4" controlId="name">
              <Form.Control type="name" name="name" placeholder="Name" />
            </Form.Group>
            <Form.Group className="my-4" controlId="email">
              <Form.Control type="email" name="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="my-4" controlId="password">
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <div className="my-4 d-flex justify-content-center align-items-baseline">
              <Button className="btn--primary mx-2" variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
