import Icons from "../Icons/Icons";
import TaskItem from "../TaskItem/TaskItem";

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
      {tasks.map((task) => (
        <TaskItem key={task.id} handleTaskDelete={handleTaskDelete} taskInfo={task} updateTaskStatus={updateTaskStatus} />
      ))}
    </div>
  );
};
export default InboxContent;
