import TaskItem from "../TaskItem/TaskItem";
import AddTask from "../AddTask/AddTask";
import useAppContext from "../../hooks/useAppContext";

const TaskContainer = ({ tasks, handleTaskDelete, updateTaskStatus }) => {
  const { isMobile } = useAppContext();
  return (
    <>
      <div className="tl-tasks__container">
        {tasks.map((task) => (
          <TaskItem handleTaskDelete={handleTaskDelete} key={task.id} taskInfo={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
      {!isMobile && <AddTask />}
    </>
  );
};
export default TaskContainer;
