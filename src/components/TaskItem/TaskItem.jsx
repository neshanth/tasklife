import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/Icons/EditIcon";
import Tags from "../Tags/Tags";
import TaskModal from "../TaskModal/TaskModal";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, label, handleTaskDelete }) => {
  const { task, due_date, id, status, tags } = taskData;
  const [showModal, setShowModal] = useState(false);
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
    <>
      <div className="task-item  my-3" onClick={handleClick}>
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
            <Link to={`/dashboard/tasks/edit/${id}`}>
              <EditIcon />
            </Link>
          </div>
        </div>
        <Tags tags={tags} />
      </div>
      <TaskModal taskData={taskData} show={showModal} handleClose={handleModalClose} handleTaskDelete={handleTaskDelete} />
    </>
  );
};

export default TaskItem;
