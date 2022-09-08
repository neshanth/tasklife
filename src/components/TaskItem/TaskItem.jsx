import React from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, deleteTask }) => {
  const { task, due_date, id, status } = taskData;
  let todo_date = new Date(due_date);

  return (
    <>
      <div className="task-item my-3 d-flex align-items-baseline justify-content-center">
        <Form className="task-status d-flex align-self-center">
          <Form.Check type="switch" id="status" checked={status} onChange={() => updateTaskStatus(id)} />
        </Form>
        <div className="task-data mx-3">
          <Link to={`/dashboard/tasks/edit/${id}`}>
            <div className="task-date-info d-flex">
              <p className="task-name my-0">{task}</p>
              <p className="task-due-date d-flex align-items-center">({todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })})</p>
            </div>
          </Link>
        </div>
        <Dropdown className="d-flex mx-2 actions-dropdown align-self-center" autoClose="outside">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#3bc29b" className="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link to={`/dashboard/tasks/edit/${id}`} className="mx-2 d-block my-2">
              <EditIcon />
            </Link>
            <span className="d-block my-2">
              <DeleteIcon className="my-2" deleteTask={deleteTask} id={id} />
            </span>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default TaskItem;
