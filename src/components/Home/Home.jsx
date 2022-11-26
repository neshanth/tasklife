import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <h1 className="hero-title">Welcome to Tasklife</h1>
          <p className="hero-secondary lead">Manage your tasks without any hassle</p>
          <div className="hero-buttons d-flex justify-content-center flex-column">
            <button className="btn btn--primary btn-login">Login</button>
            <button className="btn btn-secondary btn-demo-login">Demo Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
