import React from "react";
import { useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../context/context";
import "./home.css";
import api from "../../api/api";
import { useState } from "react";
import Header from "../Header/Header";

function Home() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      navigate("/dashboard/tasks");
    }
    setLoading(false);
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
          const { name, email, id } = user;
          setLoading(false);
          localStorage.setItem("isAuth", true);
          localStorage.setItem("user", JSON.stringify({ name, email, id }));
          navigate("/dashboard/tasks", { replace: true });
        })
        .catch((err) => {
          console.log(err);
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
