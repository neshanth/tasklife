import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Filters from "../../components/Filters/Filters";
import ContentInfo from "../../components/MainContent/ContentInfo/ContentInfo";
import TodayContent from "./TodayContent";
import "./today.scss";

const Today = ({ tasks, handleTaskDelete, updateTaskStatus, isToday = false }) => {
  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);
  return (
    <>
      <div className="tl-today">
        <BreadCrumb page="Today" />
        <div className="content-container">
          <ContentInfo sectionHeading="Today" sectionInfo="Overview of today's tasks" />
          <Filters isToday={isToday} pendingTasks={pendingTasks} completedTasks={completedTasks} statusFilters={false} />
          <TodayContent heading="Pending" tasks={pendingTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
          <TodayContent heading="Completed" tasks={completedTasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
        </div>
      </div>
    </>
  );
};
export default Today;
