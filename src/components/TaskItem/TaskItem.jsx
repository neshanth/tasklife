import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tags from "../Tags/Tags";
import Icons from "../Icons/Icons";
import useIsMobile from "../../hooks/useIsMobile";
import "./taskitem.scss";
import useAppContext from "../../hooks/useAppContext";

const TaskItem = ({ taskInfo, updateTaskStatus, handleTaskDelete }) => {
  const appPath = "/app";
  const { task, due_date, id, status, tags } = taskInfo;
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { setTaskFormAction } = useAppContext();
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const [checkBoxHover, setCheckBoxHover] = useState(false);
  let todo_date = new Date(due_date);
  let isTaskNameLong = false;
  let substringLength;

  /*------------------------------
    Handle a Task name that is too long
  --------------------------------*/
  if (window.innerWidth <= 500) {
    substringLength = 100;
    isTaskNameLong = task.length > substringLength ? true : false;
  } else {
    substringLength = 150;
    isTaskNameLong = task.length > substringLength ? true : false;
  }

  const handleTaskItemClick = () => {
    navigate(`${appPath}/tasks/${id}`, { state: { previousLocation: location } });
    setTaskFormAction("view");
  };

  const handleTaskEdit = (e) => {
    e.stopPropagation();
    navigate(`${appPath}/tasks/edit/${id}`, { state: { previousLocation: location } });
    setTaskFormAction("edit");
  };

  return (
    <div onClick={handleTaskItemClick} className={`tl-task-item`} onMouseOver={() => setShowTaskOptions(true)} onMouseLeave={() => setShowTaskOptions(false)}>
      <div className="tl-task-item__checkbox" onMouseOver={() => setCheckBoxHover(true)} onMouseLeave={() => setCheckBoxHover(false)}>
        {checkBoxHover || status ? (
          <div className="tl-task-item__done" onClick={() => updateTaskStatus(id)}>
            <Icons type="circle-filled" w="20" h="20" />
          </div>
        ) : (
          <div className="tl-task-item__pending" onClick={() => updateTaskStatus(id)}>
            <Icons type="circle" w="20" h="20" />
          </div>
        )}
        {/* <input type="checkbox" className="tl-task-item__checkbox-input" checked={status} onChange={() => updateTaskStatus(id)} /> */}
      </div>
      <div className="tl-task-item__task">
        <div className="tl-task-item__info-options">
          <p className={`tl-task-item__task-name ${status ? "task-completed" : "task-pending"}`}>{isTaskNameLong ? `${task.substring(0, substringLength)}...` : task}</p>
          {(showTaskOptions || isMobile) && (
            <div className="tl-task-item__options">
              <div className="tl-task-item__edit" onClick={(e) => handleTaskEdit(e)}>
                <Icons type="pencil" w="16" h="16" />
              </div>
              <div className="tl-task-item__delete" onClick={(e) => handleTaskDelete(e, id)}>
                <Icons type="trash" w="16" h="16" />
              </div>
            </div>
          )}
        </div>
        <div className="tl-task-item__info">
          <p className={`tl-task-item__due-date ${status ? "task-completed" : "task-pending"}`}>{todo_date.toLocaleDateString("default", { day: "numeric", month: "short" })}</p>
          <Tags tags={tags} />
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
