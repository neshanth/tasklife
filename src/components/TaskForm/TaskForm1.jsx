import { useEffect, useRef } from "react";
import Icons from "../Icons/Icons";
import "./taskform.scss";

const TaskForm = ({ handleTaskForm }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="tl-task__form tl-border">
      <div className="tl-task__form-container">
        <div className="tl-task__form-task-name">
          <input type="text" placeholder="Name of the Task" ref={inputRef} />
        </div>
        <div className="tl-task__form-task-desc">
          <input type="text" placeholder="Description of the Task" />
        </div>
        <div className="tl-task__form-task-info">
          <button className="tl-task__form-task-due-date">
            <Icons type="calendar" w="20" h="20" fill="var(--tl-theme-base)" />
            <span>Due Date</span>
          </button>
          <button className="tl-task__form-task-tags tl-border">
            <Icons type="tag" w="20" h="20" />
            <span>Tags</span>
          </button>
        </div>
      </div>
      <div className="tl-task__form-submit">
        <button className="tl-task__form-cancel tl-btn" onClick={handleTaskForm}>
          Cancel
        </button>
        <button className="tl-task__form-save tl-btn">Save</button>
      </div>
    </div>
  );
};
export default TaskForm;
