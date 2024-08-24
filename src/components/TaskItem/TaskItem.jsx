import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/Icons/EditIcon";
import Tags from "../Tags/Tags";
import TaskModal from "../TaskModal/TaskModal";
import "./taskitem.scss";
import Icons from "../Icons/Icons";

const TaskItem = ({ taskData, updateTaskStatus, label, handleTaskDelete }) => {
  const { task, due_date, id, status, tags } = taskData;
  const [showModal, setShowModal] = useState(false);
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  let todo_date = new Date(due_date);
  let isTaskNameLong = false;
  let substringLength;

  if (window.innerWidth <= 500) {
    substringLength = 10;
    isTaskNameLong = task.length > substringLength ? true : false;
  } else {
    substringLength = 50;
    isTaskNameLong = task.length > substringLength ? true : false;
  }

  const handleModalClose = () => setShowModal(false);
  const handleClick = (e) => {
    if (e.target.id === "status") return;
    setShowModal(true);
  };

  return (
    <div className="tl-task-item" onMouseOver={() => setShowTaskOptions(true)} onMouseLeave={() => setShowTaskOptions(false)}>
      <div className="tl-task-item__checkbox">
        <input type="checkbox" className="tl-task-item__checkbox-input" checked={status} onChange={() => updateTaskStatus(id)} />
      </div>
      <div className="tl-task-item__task">
        <div className="tl-task-item__info-options">
          <p className="tl-task-item__task-name">{isTaskNameLong ? `${task.substring(0, substringLength)}...` : task}</p>
          {showTaskOptions && (
            <div className="tl-task-item__options">
              <div className="tl-task-item__edit">
                <Icons type="pencil" />
              </div>
              <div className="tl-task-item__delete">
                <Icons type="trash" />
              </div>
            </div>
          )}
        </div>
        <div className="tl-task-item__info">
          <p className="tl-task-item__due-date">{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
        </div>
      </div>

      {/* <div className="task-item  my-3" onClick={handleClick}>
        <div className="task-item-controls d-flex align-items-center">
          <Form.Check id="status" className={`mx-2  ${status ? "done" : "in-progress"} task-item-status`} checked={status} onChange={() => updateTaskStatus(id)} />
          <div className="task">
            <p className="mb-0 mx-3">{isTaskNameLong ? `${task.substring(0, substringLength)}...` : task}</p>
          </div>
          {label && <div className={`task-label mx-3 ${status === 1 ? "completed" : "pending"}`}>{status === 1 ? "Completed" : "Pending"}</div>}
          <div className="due-date flex-grow-1">
            <p className="mb-0">{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
          </div>
          <div className="task-item-icons">
            <Link to={`/app/tasks/edit/${id}`}>
              <EditIcon />
            </Link>
          </div>
        </div>
        <Tags tags={tags} />
      </div>
      <TaskModal taskData={taskData} show={showModal} handleClose={handleModalClose} handleTaskDelete={handleTaskDelete} /> */}
    </div>
  );
};

export default TaskItem;
