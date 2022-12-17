import React from "react";
import { Link } from "react-router-dom";
import "./statcard.css";
const StatCard = ({ statName, stat }) => {
  return (
    <div className={`col-md-3  stat-card  ${statName}`}>
      <div className="d-flex">
        <p className="stat-name">{statName}</p>
        <p className="stat mx-1">({stat})</p>
      </div>
      <Link to="/dashboard/tasks" className="stat-link d-inline-block my-2">
        View {statName} tasks
      </Link>
    </div>
  );
};

export default StatCard;
