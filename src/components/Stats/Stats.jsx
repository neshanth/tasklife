import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import { TaskContext } from "../../context/taskContext";
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
  const { updateTaskStatus, handleTaskDelete } = useContext(TaskContext);

  useEffect(() => {
    getStats();
    getRecentTasks();
  }, []);

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
    } catch (err) {
      console.log(err);
    }
  };

  const getRecentTasks = async () => {
    try {
      const response = await api.get(`/api/tasks/recent/${JSON.parse(localStorage.getItem("user"))["id"]}`);
      setRecent(response.data.recent);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    await handleTaskDelete(id);
    await getRecentTasks();
    setLoading(false);
  };

  const updateTask = async (id) => {
    setLoading(true);
    await updateTaskStatus(id);
    await getRecentTasks();
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <p className="heading">Analytics</p>
      <div className="row stats-container justify-content-between mx-1">
        {stats.map((stat, index) => {
          return <StatCard key={index} statName={stat.statName} stat={stat.stat} />;
        })}
      </div>
      <div className="recent-tasks my-4">
        <p className="sub-heading">Recent Tasks</p>
        {recent.map((r) => (
          <TaskItem key={r.id} taskData={r} label={true} updateTaskStatus={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
      <AddTask />

      {/* <div className="row justify-content-center">
        <div className="col-md-4 my-3">
          <p className="stats-text text-center mt-2">Productivity</p>
          <div className="rounded-bar mx-auto" style={gradient}>
            <div className="inner-number">{productivity.toFixed()}%</div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Stats;
