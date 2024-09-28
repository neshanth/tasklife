import React from "react";
import "./addtask.scss";
import Icons from "../Icons/Icons";
import useAppContext from "../../hooks/useAppContext";
import { Link, useLocation } from "react-router-dom";

const AddTask = ({ handleTaskForm }) => {
  const { setTaskFormAction } = useAppContext();
  const location = useLocation();
  const appPath = "/app";
  const handleAddTaskButton = () => {
    // handleTaskForm();
    // setTaskFormAction("create");
  };
  return (
    <Link to={`${appPath}/tasks/add`} state={{ previousLocation: location }}>
      <div className="tl-add-task">
        <p className="tl-add-task__text tl-padding">
          <Icons type="plus" />
          <span>Add Task</span>
        </p>
      </div>
    </Link>
  );
};

export default AddTask;
