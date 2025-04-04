import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Spinner from "../../components/Spinner/Spinner";
import Header from "../../components/Header/Header";
import useAppContext from "../../hooks/useAppContext";
import { renderToast, verifyCookie } from "../../utils/utils";

function Login() {
  let navigate = useNavigate();
  const { auth, setAuth, setUser, loading, setLoading } = useAppContext();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  useEffect(() => {
    let authStatus = auth;
    if (authStatus === "true") {
      navigate("/app/tasks");
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
      const { id, name, email } = user;
      setLoginDetails({ email: "", password: "" });
      setLoading(false);
      setAuth(true);
      setUser({ id, name, email });
      navigate("/app/tasks", { replace: true });
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
      <div className="tl-form">
        <h4>Log in to your account</h4>
        <form className="tl-form__auth" onSubmit={handleSubmit}>
          <div className="tl-form__field">
            <label className="tl-form__field-label" htmlFor="email">
              Email
            </label>
            <input type="email" name="email" className="tl-form__field-input " placeholder="Email" onChange={handleLoginDetails} value={loginDetails.email} required />
          </div>
          <div className="tl-form__field">
            <label className="tl-form__field-label" htmlFor="password">
              Password
            </label>
            <input type="password" name="password" className="tl-form__field-input " placeholder="Password" onChange={handleLoginDetails} value={loginDetails.password} required />
          </div>
          <div className="tl-form__field">
            <button className="tl-btn tl-btn--primary" type="submit">
              Login
            </button>
          </div>
          <p>
            New to Tasklife? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
      {/* <Container>
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
      </Container> */}
    </>
  );
}

export default Login;
