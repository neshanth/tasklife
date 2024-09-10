import React from "react";
import "./addtask.scss";
import Icons from "../Icons/Icons";
import useAppContext from "../../hooks/useAppContext";

const AddTask = ({ handleTaskForm }) => {
  const { setTaskFormAction } = useAppContext();
  const handleAddTaskButton = () => {
    handleTaskForm();
    setTaskFormAction("create");
  };
  return (
    <div className="tl-add-task" onClick={handleTaskForm}>
      <p className="tl-add-task__text tl-padding">
        <Icons type="plus" />
        <span>Add Task</span>
      </p>
    </div>
  );
};

export default AddTask;
