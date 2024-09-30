import React from "react";
import "./tags.scss";
import Icons from "../Icons/Icons";

const Tags = ({ tags }) => {
  console.log(tags);
  return (
    <div className="tl-task-item-tags">
      {tags.map((tag) => (
        <span key={tag.value} className="tl-task-item-tags__tag">
          <Icons type="tag" w="10" h="10" />
          {tag.label}
        </span>
      ))}
    </div>
  );
};

export default Tags;
