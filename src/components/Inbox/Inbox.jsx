import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Filters from "../Filters/Filters";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";
import InboxContent from "./InboxContent";
import "./inbox.scss";

const Inbox = ({ pendingTasks, completedTasks, handleTaskDelete, updateTaskStatus }) => {
  return (
    <>
      <div className="tl-inbox">
        <BreadCrumb page="Inbox" />
        <div className="content-container">
          <ContentInfo sectionHeading="Inbox" sectionInfo="Overview of the tasks in your inbox" />
          <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} />
          <InboxContent heading="Pending" tasks={pendingTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
          <InboxContent heading="Completed" tasks={completedTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
        </div>
      </div>
    </>
  );
};
export default Inbox;
