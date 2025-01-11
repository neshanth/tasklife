import { useState } from "react";
import Icons from "../Icons/Icons";
import TaskContainer from "../TaskContainer/TaskContainer";

const TodayContent = ({ tasks, handleTaskDelete, updateTaskStatus, heading }) => {
  const [show, setShow] = useState(true);
  const handleContentOpen = () => {
    setShow(!show);
  };
  const styleObj = {
    transform: `${!show ? "rotate(-90deg)" : "rotate(0deg)"}`,
    transition: "transform 0.5s ease-in-out",
  };
  return (
    <div className="tl-today__content" onClick={handleContentOpen}>
      <div className="tl-today__content-header">
        <p className="tl-today__heading">
          <span className="tl-today__arrow">
            <Icons className="right" type="down" w="20" h="20" style={styleObj} />
          </span>
          {heading}
          <span className={`tl-today__count ${heading?.toLowerCase()}`}>{tasks.length}</span>
        </p>
      </div>
      {show && <TaskContainer tasks={tasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />}
    </div>
  );
};
export default TodayContent;
