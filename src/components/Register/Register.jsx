import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import api from "../../api/api";
import "./register.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { renderToast } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";

function Register() {
  const { auth, loading, setLoading } = useAppContext();
  let navigate = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({ name: "", email: "", password: "", password_confirmation: "" });

  useEffect(() => {
    let authStatus = auth;
    if (authStatus === "true") {
      navigate("app/tasks");
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
    if (registerDetails.password !== registerDetails.password_confirmation) {
      renderToast("Passwords do not match", "error");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/api/register", { ...registerDetails });
      setRegisterDetails({ name: "", email: "", password: "", password_confirmation: "" });
      setLoading(false);
      if (response.status === 200) {
        navigate("/login");
      }
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
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center home-register-form">
          <Col md={4}>
            <div className="form-background">
              <Form className="register-form" onSubmit={handleSubmit}>
                <h4>Sign Up for an account</h4>
                <Form.Group className="my-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" name="name" onChange={handleRegisterDetails} value={registerDetails.name} placeholder="Name" required />
                </Form.Group>
                <Form.Group className="my-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleRegisterDetails} value={registerDetails.email} placeholder="Email" required />
                </Form.Group>
                <Form.Group className="my-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleRegisterDetails} value={registerDetails.password} placeholder="Password" required />
                </Form.Group>
                <Form.Group className="my-3" controlId="password_confirmation">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="password_confirmation" onChange={handleRegisterDetails} value={registerDetails.password_confirmation} placeholder="Confirm Password" required />
                </Form.Group>
                <div className="mt-3 d-grid gap-2">
                  <Button className="btn--primary" variant="primary" size="lg" type="submit">
                    Sign Up
                  </Button>
                </div>
                <div className="mt-3">
                  <span>Have An Account ?</span> <Link to="/login">Please log in</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
