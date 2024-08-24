import React from "react";
import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { useLocation } from "react-router-dom";
import "./tasks.css";
import AddTask from "../AddTask/AddTask";
import { renderToast } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";

function Tasks({ getTasks, loading, updateTaskStatus, handleTaskDelete, tasks }) {
  const location = useLocation();

  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);
  const { fetchData, setFetchData } = useAppContext();

  useEffect(() => {
    if (fetchData) {
      getTasks();
      setFetchData(false);
    }

    if (location.state !== null) {
      renderToast(location.state.msg, "success");
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="tl-tasks">
      <BreadCrumb page="Tasks" />
      <div className="content-container">
        <ContentInfo sectionHeading="Tasks" sectionInfo="Overview of All the Pending Tasks" />
        <div className="tl-tasks__in-progress">
          {tasks.map((task) => (
            <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} handleTaskDelete={handleTaskDelete} />
          ))}
          <AddTask />
        </div>
      </div>

      {/* <div className="tasks-in-progress dashboard-section">
        <p className="dashboard-sub-heading">Completed ({completedTasks.length})</p>
        {completedTasks.map((task) => (
          <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} handleTaskDelete={handleTaskDelete} />
        ))}
      </div> */}
    </div>
  );
}

export default Tasks;
