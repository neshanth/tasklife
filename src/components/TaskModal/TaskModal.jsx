import React from "react";
import { Modal } from "react-bootstrap";
import Tags from "../Tags/Tags";
import "./taskmodal.css";

const TaskModal = ({ show, handleClose, taskData }) => {
  const { status, task, due_date, tags, description } = taskData;
  const options = { year: "numeric", month: "long", day: "numeric" };
  let taskDate = due_date.split("-");
  return (
    <Modal className="task-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="task-modal-spacing task-modal-status">
          <p className="task-modal-sub-heading">Status</p>
          <p className={`task-label ${status === 1 ? "completed" : "pending"}`}>{status === 1 ? "Completed" : "Pending"}</p>
        </div>
        <div className="task-modal-title task-modal-spacing">
          <p className="task-modal-heading">{task}</p>
        </div>
        <div className="task-modal-due-date task-modal-spacing">
          <p className="task-modal-sub-heading">DUE DATE</p>
          <p>{new Date(taskDate[0], taskDate[1], taskDate[2]).toLocaleDateString("en-US", options)}</p>
        </div>
        <div className="task-modal-labels task-modal-spacing">
          <p className="task-modal-sub-heading">LABELS</p>
          {tags.length === 0 ? <p>None</p> : <Tags tags={tags} />}
        </div>
        <div className="task-modal-details task-modal-spacing">
          <p className="task-modal-sub-heading">Details</p>
          <p>{description ? description : "None"}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
