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
import { UserContext } from "../../context";
import { useEffect } from "react";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ msg: "", status: "" });
  let navigate = useNavigate();
  const { setAuth } = useContext(UserContext);

  useEffect(() => {
    let authStatus = localStorage.getItem("isAuth");
    if (authStatus === "true") {
      navigate("/dashboard");
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
        .post("/api/login/", { ...loginDetails })
        .then((res) => {
          const { data } = res;
          const { user } = data;
          const { name, email, id } = user;
          setLoginDetails({ email: "", password: "" });
          setLoading(false);
          setAuth(true);
          setStatus({ msg: data, status: "success" });
          localStorage.setItem("isAuth", true);
          localStorage.setItem("user", JSON.stringify({ name, email, id }));
          navigate("/dashboard", { replace: true });
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
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} className="form-background">
          {status.msg.length > 0 ? <Alerts text={status.msg} variant={status.status} /> : ""}
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group className="my-4" controlId="email">
              <Form.Control type="email" name="email" placeholder="Email" onChange={handleLoginDetails} value={loginDetails.email} />
            </Form.Group>
            <Form.Group className="my-4" controlId="password">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleLoginDetails} value={loginDetails.password} />
            </Form.Group>
            <div className="my-4 d-flex justify-content-center align-items-baseline">
              <Button className="btn--primary mx-2" variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register">Create An Account ? </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
