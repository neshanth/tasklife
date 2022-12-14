import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, deleteTask }) => {
  const { task, due_date, id, status } = taskData;
  let todo_date = new Date(due_date);

  return (
    <>
      <div className="task-item d-flex align-items-center my-3">
        <Form.Check id="status" className="mx-2 status-checkbox" checked={status} onChange={() => updateTaskStatus(id)} />
        <div className="task">
          <p className="mb-0 mx-3">{task}</p>
        </div>
        <div className="due-date flex-grow-1">
          <p className="mb-0">{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
        </div>
        <div className="task-item-icons">
          <Link to={`/dashboard/tasks/edit/${id}`}>
            <EditIcon />
          </Link>
          <DeleteIcon deleteTask={deleteTask} id={id} />
        </div>
      </div>
    </>
  );
};

export default TaskItem;
