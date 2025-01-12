import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import Icons from "../Icons/Icons";
import "./datePickerWrapper.scss";
const DatePickerWrapper = ({ isClearable, startDate, handleDatePicker, taskFormAction, disabled = false }) => {
  const DateInput = forwardRef(({ onClick, placeholder, value }, ref) => (
    <div className="tl-task__date-input-container" ref={ref} onClick={taskFormAction === "view" ? () => {} : onClick}>
      <Icons w="25px" h="25px" type="calendar" />
      <input className="tl-task__date-input" type="text" placeholder={placeholder} value={value || (disabled ? "(Today)" : "")} readOnly={disabled} />
    </div>
  ));
  return (
    <div className="tl-task__date">
      <DatePicker
        disabled={disabled}
        isClearable={isClearable}
        dateFormat="MMM d"
        customInput={<DateInput className="tl-task__date" />}
        placeholderText="Due Date"
        selected={startDate}
        onChange={handleDatePicker}
        showPopperArrow={false}
      />
    </div>
  );
};
export default DatePickerWrapper;
