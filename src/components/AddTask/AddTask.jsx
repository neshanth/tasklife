import React from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../../assets/Icons/PlusIcon";
import "./addtask.css";

const AddTask = () => {
  return (
    <div className="task-item add-new-task">
      <PlusIcon />
      <Link to="/app/tasks/new" className="add-new-task-link">
        Add new task
      </Link>
    </div>
  );
};

export default AddTask;
