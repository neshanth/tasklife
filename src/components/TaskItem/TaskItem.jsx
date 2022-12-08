import React from "react";
import { Form } from "react-bootstrap";
import DropdownActions from "../Dropdown/Dropdown";
import "./taskitem.css";

const TaskItem = ({ taskData, updateTaskStatus, deleteTask }) => {
  const { task, due_date, id, status } = taskData;
  let todo_date = new Date(due_date);

  return (
    <>
      <div className="task-item d-flex align-items-center">
        <div className="status-checkbox">
          <Form className="task-status d-flex align-self-center">
            <Form.Check type="switch" id="status" checked={status} onChange={() => updateTaskStatus(id)} />
          </Form>
        </div>
        <div className="task flex-grow-1">
          <p className="mb-0">{task}</p>
        </div>
        <div className="dropdown">
          <DropdownActions id={id} deleteTask={deleteTask} />
        </div>
        <div className="due-date">
          <p className="mb-0">{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
