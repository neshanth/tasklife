import React from "react";
import "./statcard.css";
const StatCard = ({ statName, stat }) => {
  return (
    <div className="col-md-3  stat-card">
      <div className="text-center">
        <p className="stat-name">{statName}</p>
        <p className={`stat ${statName === "Completed" ? "completed" : statName === "Pending" ? "pending" : ""}`}>{stat}</p>
      </div>
    </div>
  );
};

export default StatCard;
