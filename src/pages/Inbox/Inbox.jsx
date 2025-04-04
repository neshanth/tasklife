import React from "react";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useLocation } from "react-router-dom";
import { renderToast } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ContentInfo from "../../components/MainContent/ContentInfo/ContentInfo";
import Filters from "../../components/Filters/Filters";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import "./inbox.scss";

function Inbox({ getTasks, loading, updateTaskStatus, handleTaskDelete, tasks, pendingTasks, completedTasks }) {
  const location = useLocation();
  const { setFetchData } = useAppContext();

  useEffect(() => {
    // getTasks();
    setFetchData(false);

    if (location.state !== null) {
      renderToast(location.state.msg, "success");
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="tl-inbox">
        <BreadCrumb page="Inbox" />
        <div className="content-container">
          <ContentInfo sectionHeading="Inbox" sectionInfo="Overview of All the Tasks" />
          <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} />
          <TaskContainer tasks={tasks} handleTaskDelete={handleTaskDelete} updateTaskStatus={updateTaskStatus} />
        </div>
      </div>
    </>
  );
}

export default Inbox;
