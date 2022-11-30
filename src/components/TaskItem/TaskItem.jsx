import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, deleteTask }) => {
  const { task, due_date, id, status } = taskData;
  let todo_date = new Date(due_date);

  return (
    <>
      {/* <div className="task-item my-3 d-flex align-items-baseline justify-content-center">
        <Form className="task-status d-flex align-self-center">
          <Form.Check type="switch" id="status" checked={status} onChange={() => updateTaskStatus(id)} />
        </Form>
        <div className="task-data mx-3">
          <Link to={`/dashboard/tasks/edit/${id}`}>
            <div className="task-date-info d-flex">
              <p className="task-name my-0">
                {task.substring(0, 50)}
                {task.length > 50 ? "..." : ""}
              </p>
              <p className="task-due-date d-flex align-items-center">({todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })})</p>
            </div>
          </Link>
        </div>
        <Dropdown className="d-flex mx-2 actions-dropdown align-self-center" autoClose="outside">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary-color)" className="bi bi-three-dots" viewBox="0 0 16 16">
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
      </div> */}
      <tr key={id}>
        <td className="table-row small-table-column">
          <Form className="task-status d-flex align-self-center">
            <Form.Check type="switch" id="status" checked={status} onChange={() => updateTaskStatus(id)} />
          </Form>
        </td>
        <td className="table-row">{task}</td>
        <td className="table-row">{due_date}</td>
        <td className="small-table-column table-row">
          <div className="d-flex">
            <Link className="me-3 d-inline-block" to={`/dashboard/tasks/edit/${id}`}>
              <EditIcon />
            </Link>
            <span className="d-block">
              <DeleteIcon deleteTask={deleteTask} id={id} />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TaskItem;
