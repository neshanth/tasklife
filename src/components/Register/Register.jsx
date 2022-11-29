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
import Alerts from "../Alerts/Alerts";
import "./register.css";
import { useContext } from "react";
import { UserContext } from "../../context";

function Register() {
  const [registerDetails, setRegisterDetails] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [confirmPass, setConfirmPass] = useState("");
  const { setAuthLoader } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    let authStatus = localStorage.getItem("isAuth");
    if (authStatus === "true") {
      navigate("/dashboard/tasks");
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
    setAuthLoader(true);
    if (registerDetails.password !== registerDetails.password_confirmation) {
      setConfirmPass("Passwords Do not Match");
      setLoading(false);
      setAuthLoader(false);
      return;
    }
    try {
      const response = await api.post("/api/register", { ...registerDetails });
      setRegisterDetails({ name: "", email: "", password: "", password_confirmation: "" });
      setLoading(false);
      setAuthLoader(false);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError([err.response.data.errors]);
      setLoading(false);
      setAuthLoader(false);
    }
  };

  const closeHandler = () => {
    setConfirmPass("");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={4} className="form-background register-form-background">
          <h2 className="text-center">Sign Up</h2>
          <Form className="register-form" onSubmit={handleSubmit}>
            <Form.Group className="my-4" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" name="name" onChange={handleRegisterDetails} value={registerDetails.name} placeholder="Name" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("name") ? <Alerts closeHandler={closeHandler} text={error[0].name[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleRegisterDetails} value={registerDetails.email} placeholder="Email" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("email") ? <Alerts closeHandler={closeHandler} text={error[0].email[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleRegisterDetails} value={registerDetails.password} placeholder="Password" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("password") ? <Alerts closeHandler={closeHandler} text={error[0].password[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="password_confirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="password_confirmation" onChange={handleRegisterDetails} value={registerDetails.password_confirmation} placeholder="Confirm Password" required />
            </Form.Group>
            {confirmPass.length > 0 ? <Alerts closeHandler={closeHandler} text={confirmPass} variant="danger" /> : ""}
            <div className="mt-4 d-grid gap-2">
              <Button className="btn--primary" variant="primary" size="lg" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
