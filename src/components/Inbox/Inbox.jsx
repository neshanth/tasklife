import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Filters from "../Filters/Filters";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";
import TaskItem from "../TaskItem/TaskItem";

const Inbox = ({ pendingTasks, completedTasks, handleTaskDelete, updateTaskStatus }) => {
  return (
    <>
      <div className="tl-inbox">
        <BreadCrumb page="Inbox" />
        <div className="content-container">
          <ContentInfo sectionHeading="Inbox" sectionInfo="Overview of the tasks in your inbox" />
          <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} />
          <div className="tl-inbox__completed">
            <p className="tl-inbox__heading">Completed</p>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} handleTaskDelete={handleTaskDelete} taskInfo={task} updateTaskStatus={updateTaskStatus} />
            ))}
          </div>
          <div className="tl-inbox__pending">
            <p className="tl-inbox__heading">Pending</p>
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} handleTaskDelete={handleTaskDelete} taskInfo={task} updateTaskStatus={updateTaskStatus} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Inbox;
