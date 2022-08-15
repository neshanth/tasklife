import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

const TaskItem = ({ taskData, updateTaskStatus }) => {
  const { task, description, due_date, id, status } = taskData;
  return (
    <tr>
      <td>
        <input type="checkbox" checked={status} onChange={() => updateTaskStatus(id)} />
      </td>
      <td>{task}</td>
      <td>{description}</td>
      <td>{due_date}</td>
      <td className="text-center">
        <Link to={`/dashboard/tasks/edit/${id}`} className="mx-2">
          <EditIcon />
        </Link>
        <Link to="/" className="mx-2">
          <DeleteIcon />
        </Link>
      </td>
    </tr>
  );
};

export default TaskItem;
