import React, { useState, useEffect, useContext } from "react";
import api from "../../api/api";
import { UserContext } from "../../context/context";
import { handleTaskDeleteResponse, updateTaskStatusApi } from "../../utils/utils";
import AddTask from "../AddTask/AddTask";
import StatCard from "../StatCard/StatCard";
import TaskItem from "../TaskItem/TaskItem";
import "./stats.css";

function Stats({ tasks }) {
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState([
    { statName: "Pending", stat: 0 },
    { statName: "Completed", stat: 0 },
    { statName: "Total", stat: 0 },
  ]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    //fetchData();
    const { completed, pending, total } = getStatsForTasks();
    setStats([
      { statName: "pending", stat: pending },
      { statName: "completed", stat: completed },
      { statName: "total", stat: total },
    ]);
    const recentTasks = tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setRecent(recentTasks.slice(0, 5));
  }, []);

  let root = document.querySelector(":root"); // select root variables
  let statCalculation = (stats[1].stat / stats[2].stat) * 100;
  let productivity = isNaN(statCalculation) ? 0 : statCalculation;
  root.style.setProperty("--gradient", productivity.toFixed() + "%");
  let gradient = { backgroundImage: "conic-gradient(var(--completed-bg) var(--gradient),var(--pending-bg) 0)" };

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

  const getStatsForTasks = () => {
    const pending = tasks.filter((t) => t.status === 0).length;
    const completed = tasks.filter((t) => t.status === 1).length;
    const total = tasks.length;
    return { pending, completed, total };
  };

  return (
    <>
      <p className="dashboard-heading">Analytics</p>
      <p>Track your progress and optimize your productivity with this analytics page. The progress bar and task status cards provide an overview of your task completion and help you stay on track</p>
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
        <p className="dashboard-sub-heading">Recent Tasks</p>
        {recent.map((r) => (
          <TaskItem key={r.id} taskData={r} label={true} updateTaskStatus={updateTask} deleteTask={deleteTask} />
        ))}
        <AddTask />
      </div>
    </>
  );
}

export default Stats;
