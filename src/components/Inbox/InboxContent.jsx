import Icons from "../Icons/Icons";
import TaskContainer from "../TaskContainer/TaskContainer";

const InboxContent = ({ tasks, handleTaskDelete, updateTaskStatus, heading }) => {
  return (
    <div className="tl-inbox__content">
      <div className="tl-inbox__content-header">
        <p className="tl-inbox__heading">
          <span>
            <Icons type="down" w="20" h="20" />
          </span>
          {heading}
          <span className={`tl-inbox__count ${heading?.toLowerCase()}`}>{tasks.length}</span>
        </p>
      </div>
      <TaskContainer tasks={tasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
    </div>
  );
};
export default InboxContent;
