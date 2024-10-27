import React from "react";
import "./statcard.scss";
const StatCard = ({ statInfo }) => {
  return (
    <div className={`stat-card  ${statInfo.statName} tl-border`}>
      <p className={`stat-card__name ${statInfo.statName.toLowerCase()}`}>{statInfo.statName}</p>
      <p className="stat-card__stat">{statInfo.stat}</p>
      <p className="stat-card__text">{statInfo.text}</p>
    </div>
  );
};

export default StatCard;
