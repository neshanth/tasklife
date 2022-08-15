import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

const TaskItem = ({ taskData }) => {
  const { task, description, due_date } = taskData;
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{task}</td>
      <td>{description}</td>
      <td>{due_date}</td>
      <td className="text-center">
        <Link to="/" className="mx-2">
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
