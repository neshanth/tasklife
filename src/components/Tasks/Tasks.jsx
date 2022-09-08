import React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import TaskItem from "../TaskItem/TaskItem";
import { useContext } from "react";
import { UserContext } from "../../context";
import Spinner from "../Spinner/Spinner";
import { updateTaskStatusApi } from "../../utils/utils";
import { Link } from "react-router-dom";

function Tasks() {
  const effectRan = useRef(false);
  const [tasks, setTasks] = useState([]);
  const { loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    if (effectRan.current === false) {
      getTasks();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tasks");
      setTasks([...response.data.tasks]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateTaskStatus = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return { ...task };
        }
      });
      setTasks([...updatedTasks]);
      updateTaskStatusApi(id);
    } catch (err) {}
  };

  const handleTaskDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks([...filteredTasks]);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {tasks.map((task) => {
        return <TaskItem key={task.id} taskData={task} updateTaskStatus={updateTaskStatus} deleteTask={handleTaskDelete} />;
      })}
      <div className="new-btn d-flex justify-content-center">
        <Link to="/dashboard/tasks/new">
          <button className="btn btn--primary">New Task</button>
        </Link>
      </div>
    </>
  );
}

export default Tasks;
