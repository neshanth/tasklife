import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      navigate("/dashboard/tasks");
    }
  }, []);

  return (
    <div className="container home-wrapper">
      <h2>Welcome To Tasklife</h2>
    </div>
  );
}

export default Home;
