import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import StatCard from "../StatCard/StatCard";
import "./stats.css";

function Stats() {
  useEffect(() => {
    getStats();
  }, []);
  const [stats, setStats] = useState([
    { statName: "Completed", stat: 0 },
    { statName: "Pending", stat: 0 },
    { statName: "Total", stat: 0 },
  ]);
  let root = document.querySelector(":root");
  let productivity = (stats[0].stat / stats[2].stat) * 100;
  root.style.setProperty("--gradient", productivity.toFixed() + "%");
  let gradient = { backgroundImage: "conic-gradient(var(--primary-color) var(--gradient),#fff 0)" };

  const getStats = async () => {
    try {
      const response = await api.get(`/api/tasks/stats/${JSON.parse(localStorage.getItem("user"))["id"]}`);
      const { data } = response;
      const { completed, pending, tasks } = data;
      setStats([
        { statName: "Completed", stat: completed },
        { statName: "Pending", stat: pending },
        { statName: "Total", stat: tasks },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-center welcome-text">Good Morning {JSON.parse(localStorage.getItem("user"))["name"]}</h2>
      <div className="row justify-content-center my-5">
        <p className="stats-text text-center mt-2">Stats</p>
        {stats.map((stat, index) => {
          return <StatCard key={index} statName={stat.statName} stat={stat.stat} />;
        })}
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 my-3">
          <p className="stats-text text-center mt-2">Productivity</p>
          <div className="rounded-bar mx-auto" style={gradient}>
            <div className="inner-number">{productivity.toFixed()}%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
