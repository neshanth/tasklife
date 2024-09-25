import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "./taskform.scss";
import Icons from "../Icons/Icons";
import "react-datepicker/dist/react-datepicker.css";
import useAppContext from "../../hooks/useAppContext";
import { handleDateIfDateIsEmpty, renderToast } from "../../utils/utils";
import api from "../../api/api";
const TaskForm = ({ handleTaskForm, getTasks, setTasks, setShowTaskForm, tasks }) => {
  const { allTags, setLoading, user, taskData, setTaskData, taskFormAction } = useAppContext();
  const [startDate, setStartDate] = useState(taskData.due_date ? new Date(taskData.due_date) : null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState(taskData.tags ? taskData.tags : []);
  const DateInput = forwardRef(({ className, onClick, placeholder, value }, ref) => (
    <div className={className} ref={ref} onClick={onClick}>
      <Icons w="25px" h="25px" type="calendar" />
      <input className="tl-task__form-date-input" type="text" placeholder={placeholder} value={value} readOnly />
    </div>
  ));
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (option) => {
    if (option.length <= 3) {
      setSelectedTags(option);
    } else {
      renderToast("Only 3 tags can be added", "error");
    }
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    const newTaskObj = { ...taskData, [name]: value };
    setTaskData(newTaskObj);
  };

  const handleDatePicker = (date) => {
    setStartDate(date);
  };

  const handleTask = async () => {
    // setLoading(true);
    // store a copy of existing tasks;
    const tasksCopy = [...tasks];
    try {
      if (startDate === null) {
        taskData.due_date = handleDateIfDateIsEmpty();
      } else {
        taskData.due_date = startDate.toISOString().split("T")[0];
      }

      // if task name is empty return
      if (!taskData.task) {
        renderToast("Task name cannot be empty", "error");
        return;
      }

      const selectedTagsForTask = selectedTags ? selectedTags.map((tag) => tag.value) : [];
      const taskObj = { ...taskData, user_id: user.id, tags: selectedTagsForTask };
      if (taskFormAction === "create") {
        setTasks((prevTasks) => [taskObj, ...prevTasks]);
      } else {
        const newTasks = tasksCopy.map((task) => {
          if (task.id === taskData.id) {
            return taskObj;
          }
          return task;
        });
        setTasks(newTasks);
      }

      setShowTaskForm(false);
      setTaskData({
        task: "",
        description: "",
        due_date: "",
      });
      const response = taskFormAction === "create" ? await api.post(`/api/tasks`, taskObj) : await api.put(`/api/tasks/${taskData.id}`, taskObj);
      await api.post(`/api/tags/add/${response.data.id}`, { tagIds: selectedTagsForTask });
      const toastMsg = taskFormAction === "create" ? "New Task Added" : "Task Updated";
      renderToast(toastMsg, "success");
      getTasks(false);
    } catch (err) {
      setLoading(false);
      setTasks(tasksCopy);
      // const errorsList = Object.values(err.response.data.errors || err).flat();
      // errorsList.forEach((err) => renderToast(err, "error"));
      renderToast(err.message, "error");
    }
  };

  // Custom styles to remove the border
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "100%", // Ensure the dropdown menu is also 100% width
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      borderBottom: "1px solid var(--tl-theme-border)",
      padding: 0,
      boxShadow: "none",
      "&:hover": {
        border: "none",
        borderBottom: "1px solid var(--tl-theme-border)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
  return (
    <div className="tl-task__form-wrapper">
      <div className="tl-task__form">
        <BreadCrumb page={taskFormAction === "create" ? "Add Task" : "Edit Task"} />
        <div className="tl-task__form-container">
          <div className="tl-task__form-name-desc tl-border">
            <div className="tl-task__form-task-name">
              <input value={taskData.task} onChange={handleTaskFormChange} name="task" type="text" placeholder="Name of the Task" ref={inputRef} />
            </div>
            <div className="tl-task__form-task-desc">
              <input value={taskData.description} onChange={handleTaskFormChange} name="description" type="text" placeholder="Description of the Task" />
            </div>
          </div>
          <div className="tl-task__form-info">
            <div className="tl-task__form-due-date">
              <DatePicker isClearable dateFormat="MMM d" customInput={<DateInput className="tl-task__form-due-date" />} placeholderText="Due Date" selected={startDate} onChange={handleDatePicker} />
            </div>
            <div className="tl-task__form-tags" onClick={() => setOpenDropdown(!openDropdown)}>
              <Icons w="25px" h="25px" type="tag" />
              <Select closeMenuOnSelect={false} styles={customStyles} placeholder="Tags" onChange={handleChange} isSearchable={false} value={selectedTags} isMulti={true} options={allTags} />
            </div>
          </div>
        </div>
      </div>
      <div className="tl-task__form-submit">
        <button className="tl-task__form-cancel tl-btn" onClick={handleTaskForm}>
          Cancel
        </button>
        <button className="tl-task__form-save tl-btn" onClick={handleTask}>
          {taskFormAction === "create" ? "Add" : "Update"}
        </button>
      </div>
    </div>
  );
};
export default TaskForm;
