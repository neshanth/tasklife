import React, { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { UserContext } from "../../context/context";
import { handleTaskDeleteResponse, updateTaskStatusApi } from "../../utils/utils";
import AddTask from "../AddTask/AddTask";
import Spinner from "../Spinner/Spinner";
import StatCard from "../StatCard/StatCard";
import TaskItem from "../TaskItem/TaskItem";
import "./stats.css";

function Stats() {
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState([
    { statName: "Pending", stat: 0 },
    { statName: "Completed", stat: 0 },
    { statName: "Total", stat: 0 },
  ]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  let root = document.querySelector(":root"); // select root variables
  let statCalculation = (stats[1].stat / stats[2].stat) * 100;
  let productivity = isNaN(statCalculation) ? 0 : statCalculation;
  root.style.setProperty("--gradient", productivity.toFixed() + "%");
  let gradient = { backgroundImage: "conic-gradient(var(--completed-bg) var(--gradient),var(--pending-bg) 0)" };

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsResponse = api.get(`/api/tasks/stats/${user.id}`);
      const recentTasksResponse = api.get(`/api/tasks/recent/${user.id}`);
      const [statsData, recentTasksData] = await Promise.all([statsResponse, recentTasksResponse]);
      const { completed, pending, tasks } = statsData.data;
      setStats([
        { statName: "pending", stat: pending },
        { statName: "completed", stat: completed },
        { statName: "total", stat: tasks },
      ]);
      setRecent(recentTasksData.data.recent);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await handleTaskDeleteResponse(id);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const updateTask = async (id) => {
    setLoading(true);
    try {
      await updateTaskStatusApi(id);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <p className="heading">Analytics</p>
      <div className="row justify-content-center dashboard-section">
        <div className="col-md-4">
          <div className="rounded-bar mx-auto" style={gradient}>
            <div className="inner-number">
              <p className="prod-percent">{productivity.toFixed()}%</p>
              <p className="prod-title">Productivity</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row dashboard-section stats-container justify-content-between">
        {stats.map((stat, index) => {
          return <StatCard key={index} statName={stat.statName} stat={stat.stat} />;
        })}
      </div>

      <div className="recent-tasks dashboard-section">
        <p className="sub-heading">Recent Tasks</p>
        {recent.map((r) => (
          <TaskItem key={r.id} taskData={r} label={true} updateTaskStatus={updateTask} deleteTask={deleteTask} />
        ))}
        <AddTask />
      </div>
    </>
  );
}

export default Stats;
