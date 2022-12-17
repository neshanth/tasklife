import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import Spinner from "../Spinner/Spinner";
import StatCard from "../StatCard/StatCard";
import "./stats.css";

function Stats() {
  useEffect(() => {
    getStats();
  }, []);

  const [stats, setStats] = useState([
    { statName: "Pending", stat: 0 },
    { statName: "Completed", stat: 0 },
    { statName: "Total", stat: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  let root = document.querySelector(":root"); // select root variables
  let statCalculation = (stats[0].stat / stats[2].stat) * 100;
  let productivity = isNaN(statCalculation) ? 0 : statCalculation;
  root.style.setProperty("--gradient", productivity.toFixed() + "%");
  let gradient = { backgroundImage: "conic-gradient(var(--primary-color) var(--gradient),#ADA9BB 0)" };

  const getStats = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/tasks/stats/${JSON.parse(localStorage.getItem("user"))["id"]}`);
      const { data } = response;
      const { completed, pending, tasks } = data;
      setStats([
        { statName: "pending", stat: pending },
        { statName: "completed", stat: completed },
        { statName: "total", stat: tasks },
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <p className="heading">Analytics</p>
      <div className="row mx-0 my-0 justify-content-between">
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
