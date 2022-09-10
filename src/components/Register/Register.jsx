import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import api from "../../api/api";

function Register() {
  const [registerDetails, setRegisterDetails] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let authStatus = localStorage.getItem("isAuth");
    if (authStatus === "true") {
      navigate("/dashboard");
    }
  }, []);

  const handleRegisterDetails = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({
      ...registerDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/register", { ...registerDetails });
      setRegisterDetails({ name: "", email: "", password: "" });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} className="form-background">
          <Form className="register-form" onSubmit={handleSubmit}>
            <Form.Group className="my-4" controlId="name">
              <Form.Control type="name" name="name" onChange={handleRegisterDetails} value={registerDetails.name} placeholder="Name" />
            </Form.Group>
            <Form.Group className="my-4" controlId="email">
              <Form.Control type="email" name="email" onChange={handleRegisterDetails} value={registerDetails.email} placeholder="Email" />
            </Form.Group>
            <Form.Group className="my-4" controlId="password">
              <Form.Control type="password" name="password" onChange={handleRegisterDetails} value={registerDetails.password} placeholder="Password" />
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
