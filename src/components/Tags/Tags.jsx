import React from "react";
import "./tags.scss";
import Icons from "../Icons/Icons";

const Tags = ({ tags }) => {
  return (
    <div className="tl-task-item-tags">
      {tags.map((tag, index) => (
        <>
          <span key={index} className="tl-task-item-tags__tag">
            <Icons type="tag" />
            {tag.label}
          </span>
        </>
      ))}
    </div>
  );
};

export default Tags;
