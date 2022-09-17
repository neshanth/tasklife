import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import "./stats.css";

function Stats() {
  useEffect(() => {
    getStats();
  }, []);
  const [stats, setStats] = useState({});
  let root = document.querySelector(":root");
  let productivity = (stats.completed / stats.tasks) * 100;
  root.style.setProperty("--gradient", productivity.toFixed() + "%");
  let gradient = { backgroundImage: "conic-gradient(#000 var(--gradient),#fff 0)" };

  const getStats = async () => {
    try {
      const response = await api.get(`/api/tasks/stats/${JSON.parse(localStorage.getItem("user"))["id"]}`);
      const { data } = response;
      const { completed, pending, tasks } = data;
      setStats({ completed, pending, tasks });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-center">Good Morning {JSON.parse(localStorage.getItem("user"))["name"]}</h2>
      <p className="stats-text text-center">Your Stats</p>
      <div className="row">
        <div className="col-md-4">
          <div className="rounded-bar" style={gradient}>
            <div className="inner-number">50%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
