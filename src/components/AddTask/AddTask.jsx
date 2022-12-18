import React from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../../assets/Icons/PlusIcon";

const AddTask = () => {
  return (
    <div className="task-item">
      <PlusIcon />
      <Link to="/dashboard/tasks/new" className="add-new-task-link">
        Add new task
      </Link>
    </div>
  );
};

export default AddTask;
