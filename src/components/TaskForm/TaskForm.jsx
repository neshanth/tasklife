import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "./taskform.scss";
import Icons from "../Icons/Icons";
import "react-datepicker/dist/react-datepicker.css";
import useAppContext from "../../hooks/useAppContext";
import { renderToast } from "../../utils/utils";
const TaskForm = ({ handleTaskForm }) => {
  const { allTags } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
      setSelectedOptions(option);
    } else {
      renderToast("Only 3 tags can be added", "error");
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
              <input type="text" placeholder="Name of the Task" ref={inputRef} />
            </div>
            <div className="tl-task__form-task-desc">
              <input type="text" placeholder="Description of the Task" />
            </div>
          </div>
          <div className="tl-task__form-info">
            <div className="tl-task__form-due-date">
              <DatePicker
                isClearable
                dateFormat="MMM d"
                customInput={<DateInput className="tl-task__form-due-date" />}
                placeholderText="Due Date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="tl-task__form-tags" onClick={() => setOpenDropdown(!openDropdown)}>
              <Icons w="25px" h="25px" type="tag" />
              <Select closeMenuOnSelect={false} styles={customStyles} placeholder="Tags" onChange={handleChange} isSearchable={false} value={selectedOptions} isMulti={true} options={allTags} />
            </div>
          </div>
        </div>
      </div>
      <div className="tl-task__form-submit">
        <button className="tl-task__form-cancel tl-btn" onClick={handleTaskForm}>
          Cancel
        </button>
        <button className="tl-task__form-save tl-btn">Save</button>
      </div>
    </div>
  );
};
export default TaskForm;
