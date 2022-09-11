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
import Alerts from "../Alerts/Alerts";

function Register() {
  const [registerDetails, setRegisterDetails] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [confirmPass, setConfirmPass] = useState("");
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
    if (registerDetails.password !== registerDetails.password_confirmation) {
      setConfirmPass("Passwords Do not Match");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/register", { ...registerDetails });
      setRegisterDetails({ name: "", email: "", password: "", password_confirmation: "" });
      setLoading(false);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors);
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
              <Form.Control type="name" name="name" onChange={handleRegisterDetails} value={registerDetails.name} placeholder="Name" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("name") ? <Alerts text={error[0].name[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="email">
              <Form.Control type="email" name="email" onChange={handleRegisterDetails} value={registerDetails.email} placeholder="Email" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("email") ? <Alerts text={error[0].email[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="password">
              <Form.Control type="password" name="password" onChange={handleRegisterDetails} value={registerDetails.password} placeholder="Password" required />
            </Form.Group>
            {error.length > 0 && error[0].hasOwnProperty("password") ? <Alerts text={error[0].password[0]} variant="danger" /> : ""}
            <Form.Group className="my-4" controlId="password_confirmation">
              <Form.Control type="password" name="password_confirmation" onChange={handleRegisterDetails} value={registerDetails.password_confirmation} placeholder="Confirm Password" required />
            </Form.Group>
            {confirmPass.length > 0 ? <Alerts text={confirmPass} variant="danger" /> : ""}
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
