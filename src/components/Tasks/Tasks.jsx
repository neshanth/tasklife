import React from "react";
import { useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { useLocation } from "react-router-dom";
import AddTask from "../AddTask/AddTask";
import { renderToast } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";
import Filters from "../Filters/Filters";
import "./tasks.scss";

function Tasks({ getTasks, loading, updateTaskStatus, handleTaskDelete, tasks, pendingTasks, completedTasks }) {
  const location = useLocation();
  const { setFetchData, isMobile } = useAppContext();

  useEffect(() => {
    getTasks();
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
      <div className="tl-tasks">
        <BreadCrumb page="Tasks" />
        <div className="content-container">
          <ContentInfo sectionHeading="Tasks" sectionInfo="Overview of All the Pending Tasks" />
          <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} />
          <div className="tl-tasks__container">
            {tasks.map((task) => (
              <TaskItem handleTaskDelete={handleTaskDelete} key={task.id} taskInfo={task} updateTaskStatus={updateTaskStatus} />
            ))}
            {/* {showTaskForm && <TaskForm updateTaskStatus={updateTaskStatus} tasks={tasks} setShowTaskForm={setShowTaskForm} handleTaskForm={handleTaskForm} getTasks={getTasks} setTasks={setTasks} />} */}
          </div>
          {!isMobile && <AddTask />}
        </div>
      </div>
    </>
  );
}

export default Tasks;
