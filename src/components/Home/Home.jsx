import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      navigate("/dashboard/tasks");
    }
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  return (
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
                <button className="btn btn--secondary btn-demo-login">Demo Login</button>
              </div>
            </section>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;
