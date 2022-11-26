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
    <div className="container home-wrapper">
      <h2>Welcome To Tasklife</h2>
    </div>
  );
}

export default Home;
