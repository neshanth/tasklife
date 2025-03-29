import React, { useState, useEffect, useMemo } from "react";
import StatCard from "../../components/StatCard/StatCard";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ContentInfo from "../../components/MainContent/ContentInfo/ContentInfo";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import useAppContext from "../../hooks/useAppContext";
import Spinner from "../../components/Spinner/Spinner";
import "./dashboard.scss";

function Dashboard({ tasks, updateTaskStatus, handleTaskDelete }) {
  const [stats, setStats] = useState([
    { statName: "Productivity", stat: 0, text: "Your daily productivity" },
    { statName: "Pending", stat: 0, text: "Tasks are pending" },
    { statName: "Completed", stat: 0, text: "Tasks are completed" },
    { statName: "Total", stat: 0, text: "Total tasks" },
  ]);
  const { loading } = useAppContext();

  useEffect(() => {
    function getStatsForTasks() {
      const pending = tasks.filter((t) => t.status === 0).length;
      const completed = tasks.filter((t) => t.status === 1).length;
      const total = tasks.length;
      const statCalculation = (completed / total) * 100;
      const productivity = isNaN(statCalculation) ? 0 : statCalculation;
      return { pending, completed, total, productivity };
    }
    const { completed, pending, total, productivity } = getStatsForTasks();
    setStats((prevStats) =>
      prevStats.map((item) => {
        switch (item.statName) {
          case "Pending":
            return { ...item, stat: pending };
          case "Completed":
            return { ...item, stat: completed };
          case "Total":
            return { ...item, stat: total };
          case "Productivity":
            return { ...item, stat: `${productivity.toFixed()}%` };
          default:
            return item;
        }
      })
    );
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return tasks
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [tasks]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="tl-dashboard">
        <BreadCrumb page="Dashboard" />
        <div className="content-container">
          <ContentInfo sectionHeading="Dashboard" sectionInfo="Track your progress and optimize your productivity with this analytics page." />
          <div className="tl-dashboard__stats-container">
            {stats.map((stat, index) => {
              return <StatCard key={index} statInfo={stat} />;
            })}
          </div>

          <div className="recent-tasks dashboard-section">
            <p className="dashboard-sub-heading">Recent Tasks</p>
            <TaskContainer tasks={recentTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
