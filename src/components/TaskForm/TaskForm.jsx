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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
const TaskForm = ({ getTasks, setTasks, tasks }) => {
  const TASK_DATA = {
    task: "",
    description: "",
    due_date: "",
    tags: [],
    id: "",
    status: 0,
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { allTags, user, taskFormAction } = useAppContext();
  const [taskData, setTaskData] = useState(TASK_DATA);
  const [startDate, setStartDate] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState(taskData.tags ? taskData.tags : []);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      const taskData = tasks.find((task) => task.id === parseInt(id));
      setTaskData(taskData);
      setStartDate(taskData?.due_date ? new Date(taskData.due_date) : null);
      setSelectedTags(taskData?.tags ? taskData.tags : []);
    }
  }, [id, tasks]);

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
    const obj = {};
    if (e?.type === "status") {
      obj.name = "status";
      obj.value = e.value;
    } else {
      obj.name = e.target.name;
      obj.value = e.target.value;
    }
    const newTaskObj = { ...taskData, [obj.name]: obj.value };
    setTaskData(newTaskObj);
  };

  const handleDatePicker = (date) => {
    setStartDate(date);
  };

  const handleTaskAddOrUpdate = async (e) => {
    e.preventDefault();
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

      const selectedTagValuesForTask = selectedTags ? selectedTags.map((tag) => tag.value) : [];
      const selectedTagsForTask = selectedTags || [];
      const taskObj = { ...taskData, user_id: user.id, tags: selectedTagsForTask };
      if (taskFormAction === "create") {
        setTasks((prevTasks) => [taskObj, ...prevTasks]);
        if (isMobile) {
          navigate(-1);
        }
      } else {
        const newTasks = tasksCopy.map((task) => {
          if (task.id === taskData.id) {
            return taskObj;
          }
          return task;
        });
        setTasks(newTasks);
        navigate(-1);
      }
      setTaskData(TASK_DATA);
      setStartDate(null);
      setSelectedTags([]);
      const response = taskFormAction === "create" ? await api.post(`/api/tasks`, taskObj) : await api.put(`/api/tasks/${taskData.id}`, taskObj);
      await api.post(`/api/tags/add/${response.data.id}`, { tagIds: selectedTagValuesForTask });
      const toastMsg = taskFormAction === "create" ? "New Task Added" : "Task Updated";
      renderToast(toastMsg, "success");
      getTasks(false);
    } catch (err) {
      setTasks(tasksCopy);
      renderToast(err.message, "error");
    }
  };

  const handleCancelButton = () => {
    navigate(location.state?.previousLocation?.pathname || -1);
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
  const taskFormTitle = taskFormAction === "create" ? "New" : taskFormAction === "edit" ? "Edit" : "View";
  return (
    <form className="tl-task__form-wrapper">
      <div className="tl-task__form">
        <div className="tl-task__form-title-container">
          <BreadCrumb page={taskFormTitle} showClose={true} />
        </div>
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
            {taskFormAction !== "create" && (
              <div className="tl-task__form-task-status">
                {taskData.status ? <Icons type="circle-filled" w="20" h="20" /> : <Icons type="circle" w="20" h="20" />}
                <Select
                  value={taskData.status ? { value: 1, label: "Completed" } : { value: 0, label: "Pending" }}
                  name="status"
                  onChange={handleTaskFormChange}
                  options={[
                    {
                      value: 1,
                      label: "Completed",
                      type: "status",
                    },
                    {
                      value: 0,
                      label: "Pending",
                      type: "status",
                    },
                  ]}
                  styles={customStyles}
                />
              </div>
            )}

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
        <button type="button" className="tl-task__form-cancel tl-btn" onClick={handleCancelButton}>
          Cancel
        </button>
        <button type="submit" className="tl-task__form-save tl-btn" onClick={handleTaskAddOrUpdate}>
          {taskFormAction === "create" ? "Add" : "Update"}
        </button>
      </div>
    </form>
  );
};
export default TaskForm;
