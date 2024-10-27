import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Filters from "../Filters/Filters";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";
import TodayContent from "./TodayContent";
import "./today.scss";

const Today = ({ pendingTasks, completedTasks, handleTaskDelete, updateTaskStatus }) => {
  return (
    <>
      <div className="tl-today">
        <BreadCrumb page="Today" />
        <div className="content-container">
          <ContentInfo sectionHeading="Today" sectionInfo="Overview of today's tasks" />
          <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} statusFilters={false} />
          <TodayContent heading="Pending" tasks={pendingTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
          <TodayContent heading="Completed" tasks={completedTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
        </div>
      </div>
    </>
  );
};
export default Today;
