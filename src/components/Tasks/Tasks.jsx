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
import useIsMobile from "../../hooks/useIsMobile";

function Tasks({ getTasks, loading, updateTaskStatus, handleTaskDelete, tasks, setTasks, handleTaskForm, showTaskForm, setShowTaskForm }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const pendingTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);
  const { setFetchData } = useAppContext();

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
              <TaskItem handleTaskForm={handleTaskForm} handleTaskDelete={handleTaskDelete} key={task.id} taskInfo={task} updateTaskStatus={updateTaskStatus} />
            ))}
            {/* {showTaskForm && <TaskForm updateTaskStatus={updateTaskStatus} tasks={tasks} setShowTaskForm={setShowTaskForm} handleTaskForm={handleTaskForm} getTasks={getTasks} setTasks={setTasks} />} */}
          </div>
          {!isMobile && <AddTask />}
        </div>
      </div>
      {isMobile && <AddTask />}
    </>
  );
}

export default Tasks;
