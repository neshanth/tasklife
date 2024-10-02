import React from "react";
import Icons from "../Icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import "./addtask.scss";

const AddTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTaskFormAction } = useAppContext();
  const appPath = "/app";
  const handleClick = () => {
    navigate(`${appPath}/tasks/add`, { state: { previousLocation: location } });
    setTaskFormAction("create");
  };
  return (
    <div className="tl-add-task" onClick={handleClick}>
      <p className="tl-add-task__text tl-padding">
        <Icons type="plus" />
        <span>Add Task</span>
      </p>
    </div>
  );
};

export default AddTask;
