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
const TaskForm = ({ handleTaskForm, getTasks }) => {
  const { allTags, setLoading, user } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTask, setNewTask] = useState({
    task: "",
    description: "",
    due_date: "",
  });
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
    const newTaskObj = { ...newTask, [name]: value };
    setNewTask(newTaskObj);
  };

  const handleDatePicker = (date) => {
    setStartDate(date);
  };

  const handleNewTask = async () => {
    setLoading(true);
    try {
      if (startDate === null) {
        newTask.due_date = handleDateIfDateIsEmpty();
      } else {
        newTask.due_date = startDate.toISOString().split("T")[0];
      }
      const response = await api.post(`/api/tasks`, { ...newTask, user_id: user.id });
      await api.post(`/api/tags/add/${response.data.id}`, { tagIds: selectedTags.map((tag) => tag.value) });
      renderToast("New Task Added", "success");
      getTasks();
    } catch (err) {
      setLoading(false);
      const errorsList = Object.values(err.response.data.errors).flat();
      errorsList.forEach((err) => renderToast(err, "error"));
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
        <BreadCrumb page="Add Task" />
        <div className="tl-task__form-container">
          <div className="tl-task__form-name-desc tl-border">
            <div className="tl-task__form-task-name">
              <input value={newTask.task} onChange={handleTaskFormChange} name="task" type="text" placeholder="Name of the Task" ref={inputRef} />
            </div>
            <div className="tl-task__form-task-desc">
              <input value={newTask.description} onChange={handleTaskFormChange} name="description" type="text" placeholder="Description of the Task" />
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
        <button className="tl-task__form-save tl-btn" onClick={handleNewTask}>
          Add
        </button>
      </div>
    </div>
  );
};
export default TaskForm;
