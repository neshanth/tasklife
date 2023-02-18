import React from "react";
import "./tags.css";

const Tags = ({ tags }) => {
  const TAG_COLORS = ["#ef92f1", "#108000", "#ffb01c"];
  return (
    <div className="task-item-tags">
      {tags.map((tag, index) => (
        <span style={{ color: TAG_COLORS[index] }} key={index} className="tags">
          {tag}
          {index !== tags.length - 1 ? "," : ""}
        </span>
      ))}
    </div>
  );
};

export default Tags;
