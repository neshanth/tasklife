import Icons from "../Icons/Icons";
import TaskContainer from "../TaskContainer/TaskContainer";

const TodayContent = ({ tasks, handleTaskDelete, updateTaskStatus, heading }) => {
  return (
    <div className="tl-today__content">
      <div className="tl-today__content-header">
        <p className="tl-today__heading">
          <span>
            <Icons type="down" w="20" h="20" />
          </span>
          {heading}
          <span className={`tl-today__count ${heading?.toLowerCase()}`}>{tasks.length}</span>
        </p>
      </div>
      <TaskContainer tasks={tasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
    </div>
  );
};
export default TodayContent;
