import React from "react";
import { useEffect, useState, useRef } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Spinner from "../Spinner/Spinner";
import { useLocation } from "react-router-dom";
import "./tasks.scss";
import AddTask from "../AddTask/AddTask";
import { renderToast } from "../../utils/utils";
import useAppContext from "../../hooks/useAppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ContentInfo from "../MainContent/ContentInfo/ContentInfo";
import Filters from "../Filters/Filters";
import TaskForm from "../TaskForm/TaskForm";

function Tasks({ getTasks, loading, updateTaskStatus, handleTaskDelete, tasks, setTasks, handleTaskForm, showTaskForm, setShowTaskForm }) {
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
        <Filters pendingTasks={pendingTasks} completedTasks={completedTasks} />
        <div className="tl-tasks__container">
          {tasks.map((task) => (
            <TaskItem handleTaskForm={handleTaskForm} handleTaskDelete={handleTaskDelete} key={task.id} taskInfo={task} updateTaskStatus={updateTaskStatus} />
          ))}
          {showTaskForm && <TaskForm tasks={tasks} setShowTaskForm={setShowTaskForm} handleTaskForm={handleTaskForm} getTasks={getTasks} setTasks={setTasks} />}
        </div>
        {<AddTask handleTaskForm={handleTaskForm} />}
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
