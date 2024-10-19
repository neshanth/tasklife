import "./filters.scss";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Search from "../Search/Search";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import TLModal from "../TLModal/TLModal";

const Filters = ({ pendingTasks, completedTasks }) => {
  const { filters, setFilters } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const DatePickerInput = forwardRef(({ value, onClick, className }, ref) => (
    <div className="tl-filters__date tl-border filters-padding" onClick={onClick} ref={ref}>
      <Icons type="calendar" w="20" h="20" />
      <button className={className}>{value ? value : "Date"}</button>
    </div>
  ));

  const handleFilterChange = (type, value) => {
    const currentFilters = { ...filters };
    currentFilters[type] = value;
    setFilters(currentFilters);
  };

  const handleFilterClose = () => {
    setShowFilters(false);
  };

  return (
    <section className="tl-filters">
      <div className="tl-filters__options">
        <div className="tl-filters__status-button">
          <div className={`tl-filters__btn-pending filters-padding ${filters.status === "pending" ? "tl-filters--active" : ""}`} onClick={() => handleFilterChange("status", "pending")}>
            <button>Pending</button>
            <span>{pendingTasks.length}</span>
          </div>
          <div className={`tl-filters__btn-completed filters-padding  ${filters.status === "completed" ? "tl-filters--active" : ""}`} onClick={() => handleFilterChange("status", "completed")}>
            <button>Completed</button>
            <span>{completedTasks.length}</span>
          </div>
        </div>
        <div className="tl-filters__btn tl-border filters-padding">
          <button onClick={() => setShowFilters(!showFilters)}>
            <Icons type="filter" w="20" h="20" />
            Filters
          </button>
        </div>

        {showFilters && (
          <TLModal page="Filters" showClose={true} handleCloseBtnClick={handleFilterClose}>
            <div className="tl-filters__wrapper">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  handleFilterChange("date", date);
                }}
                customInput={<DatePickerInput />}
                isClearable
              />
              <div className="tl-filters__tags tl-border filters-padding">
                <Icons type="tag" w="20" h="20" />
                <button>Tags</button>
              </div>
            </div>
          </TLModal>
        )}
      </div>
      <Search />
    </section>
  );
};
export default Filters;
