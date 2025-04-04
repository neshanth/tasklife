import { useState } from "react";
import Icons from "../../components/Icons/Icons";
import TaskContainer from "../../components/TaskContainer/TaskContainer";

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
          <span className={`tl-today__arrow ${!show ? "tl-today__arrow--rotate" : ""}`} style={styleObj}>
            <Icons className="right" type="down" w="20" h="20" />
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
