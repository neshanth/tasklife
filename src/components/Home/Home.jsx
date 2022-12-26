import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./home.css";
import api from "../../api/api";
import { useState } from "react";
import Header from "../Header/Header";
import useAuthContext from "../../hooks/useAuthContext";

function Home() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { auth, setAuth, setUser } = useAuthContext();

  useEffect(() => {
    if (auth) {
      navigate("/dashboard/tasks");
    }
  }, []);

  const loginDetails = {
    email: `${process.env.REACT_APP_DEMO_EMAIL}`,
    password: `${process.env.REACT_APP_DEMO_PASSWORD}`,
  };

  const handleDemoLogin = () => {
    setLoading(true);
    api.get("/sanctum/csrf-cookie").then(() => {
      api
        .post("/api/login", { ...loginDetails })
        .then((res) => {
          const { data } = res;
          const { user } = data;
          const { id } = user;
          setLoading(false);
          setAuth(true);
          setUser({ id });
          navigate("/dashboard/tasks", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setAuth(false);
          setLoading(false);
        });
    });
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="hero-wrapper">
          <div className="hero-bg">
            <Container>
              <section className="hero-content">
                <h1 className="hero-title">Welcome to Tasklife</h1>
                <p className="hero-secondary lead">Manage your tasks without any hassle</p>
                <div className="hero-buttons d-grid gap-2 d-sm-flex justify-content-sm-center flex-column">
                  <Link className="btn btn--primary btn-login" to="/login">
                    Login
                  </Link>
                  <button className="btn btn--secondary btn-demo-login" onClick={handleDemoLogin}>
                    Demo Login
                  </button>
                </div>
              </section>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
