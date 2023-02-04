import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/Icons/EditIcon";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, label }) => {
  const { task, due_date, id, status, tags } = taskData;
  const TAG_COLORS = ["#ef92f1", "#108000", "#ffb01c"];
  let todo_date = new Date(due_date);
  let isTaskNameLong = false;

  if (window.innerWidth <= 500) {
    isTaskNameLong = task.length > 10 ? true : false;
  }

  return (
    <>
      <div className="task-item  my-3">
        <div className="task-item-controls d-flex align-items-center">
          <Form.Check type="switch" id="status" className={`mx-2  ${status ? "done" : "in-progress"}`} checked={status} onChange={() => updateTaskStatus(id)} />
          <div className="task">
            <p className="mb-0 mx-3">{isTaskNameLong ? `${task.substring(0, 10)}...` : task}</p>
          </div>
          {label && <div className={`task-label mx-3 ${status === 1 ? "completed" : "pending"}`}>{status === 1 ? "Completed" : "Pending"}</div>}
          <div className="due-date flex-grow-1">
            <p className="mb-0">{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
          </div>
          <div className="task-item-icons">
            <Link to={`/dashboard/tasks/edit/${id}`}>
              <EditIcon />
            </Link>
          </div>
        </div>
        <div className="task-item-tags">
          {tags.map((tag, index) => (
            <span style={{ color: TAG_COLORS[index] }} key={index} className="tags">
              {tag}
              {index !== tags.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskItem;
