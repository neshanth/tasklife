import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import Alerts from "../Alerts/Alerts";
import { UserContext } from "../../context/context";
import { useEffect } from "react";
import logo from "../../assets/Images/tasklife__logo.png";
import "./login.css";
import Header from "../Header/Header";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ msg: "", status: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let authStatus = localStorage.getItem("isAuth");
    if (authStatus === "true") {
      navigate("/dashboard/tasks");
    }
  }, []);

  const handleLoginDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.get("/sanctum/csrf-cookie").then(() => {
      api
        .post("/api/login", { ...loginDetails })
        .then((res) => {
          const { data } = res;
          const { user } = data;
          const { name, email, id } = user;
          setLoginDetails({ email: "", password: "" });
          setLoading(false);
          setStatus({ msg: data, status: "success" });
          localStorage.setItem("isAuth", true);
          localStorage.setItem("user", JSON.stringify({ name, email, id }));
          navigate("/dashboard/tasks", { replace: true });
        })
        .catch((err) => {
          const { data } = err.response;
          setStatus({ msg: data, status: "danger" });
          setLoading(false);
        });
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center  home-login-form">
          <Col md={4}>
            <img className="form-logo" src={logo} width="100" alt="logo" />
            <div className="form-background login-form-background">
              {status.msg.length > 0 ? <Alerts text={status.msg} variant={status.status} /> : ""}
              <Form className="login-form" onSubmit={handleSubmit}>
                <h4>Log in to your account</h4>
                <Form.Group className="my-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Email" onChange={handleLoginDetails} value={loginDetails.email} required />
                </Form.Group>
                <Form.Group className="my-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" onChange={handleLoginDetails} value={loginDetails.password} required />
                </Form.Group>
                <div className="my-3 d-grid gap-2">
                  <Button className="btn--primary" variant="primary" size="lg" type="submit">
                    Log In
                  </Button>
                </div>
                <div className="mt-3">
                  <span>New to TaskLife?</span> <Link to="/register">Sign up</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
