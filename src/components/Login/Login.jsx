import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";
import "./login.css";
import Header from "../Header/Header";
import useAuthContext from "../../hooks/useAuthContext";
import { renderToast, verifyCookie } from "../../utils/utils";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const { auth, setAuth, setUser } = useAuthContext();

  useEffect(() => {
    let authStatus = auth;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyCookie();
      let res = await api.post("/api/login", { ...loginDetails });
      const { data } = res;
      const { user } = data;
      const { id, name } = user;
      setLoginDetails({ email: "", password: "" });
      setLoading(false);
      setAuth(true);
      setUser({ id, name });
      navigate("/dashboard/tasks", { replace: true });
    } catch (err) {
      console.log(err);
      const { data } = err.response;
      renderToast(data, "error");
      setAuth(false);
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
        <Row className="justify-content-center align-items-center  home-login-form">
          <Col md={4}>
            <div className="form-background login-form-background">
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
