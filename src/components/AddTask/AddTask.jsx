import React from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../../assets/Icons/PlusIcon";
import "./addtask.scss";
import Icons from "../Icons/Icons";

const AddTask = () => {
  return (
    <div className="tl-add-task">
      <p className="tl-add-task__text tl-padding">
        <Icons type="plus" />
        <span>Add Task</span>
      </p>
    </div>
  );
};

export default AddTask;
