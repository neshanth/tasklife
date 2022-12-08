import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuIcon from "../../assets/Icons/MenuIcon";
import EditIcon from "../../assets/Icons/EditIcon";
import DeleteIcon from "../../assets/Icons/DeleteIcon";

const DropdownActions = ({ deleteTask, id }) => {
  return (
    <Dropdown className="d-flex mx-2 actions-dropdown align-self-center" autoClose="outside">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        <MenuIcon />
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
  );
};

export default DropdownActions;
