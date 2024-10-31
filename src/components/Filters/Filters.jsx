import "./filters.scss";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Search from "../Search/Search";
import { useState } from "react";
import TLModal from "../TLModal/TLModal";
import DatePickerWrapper from "../DatePickerWrapper/DatePickerWrapper";
import SelectWrapper from "../SelectWrapper/SelectWrapper";

const Filters = ({ pendingTasks, completedTasks, statusFilters = true }) => {
  const { filters, setFilters } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState("");
  const { allTags } = useAppContext();

  const handleFilterChange = (type, value) => {
    const currentFilters = { ...filters };
    currentFilters[type] = value;
    setFilters(currentFilters);
  };

  const handleFilterClose = () => {
    setShowFilters(false);
  };

  const handleDatePicker = (date) => {
    setStartDate(date);
    handleFilterChange("date", date);
  };

  const handleTags = (option) => {
    setSelectedTags(option);
    handleFilterChange(
      "tags",
      option.map((option) => option.label)
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    handleFilterChange("search", e.target.value);
  };

  return (
    <section className="tl-filters">
      <div className="tl-filters__options">
        {statusFilters && (
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
        )}

        <div className="tl-filters__btn tl-border filters-padding">
          <button onClick={() => setShowFilters(!showFilters)}>
            <Icons type="filter" w="20" h="20" />
            Filter
          </button>
        </div>

        {showFilters && (
          <TLModal page="Filters" showClose={true} handleCloseBtnClick={handleFilterClose}>
            <div className="tl-filters__wrapper">
              <DatePickerWrapper startDate={startDate} isClearable={true} handleDatePicker={handleDatePicker} />
              <div className="tl-filters__wrapper-tags">
                <Icons type="tag" w="25" h="25" />
                <SelectWrapper onChange={handleTags} value={selectedTags} options={allTags} isDisabled={false} isMulti={true} />
              </div>
            </div>
          </TLModal>
        )}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </section>
  );
};
export default Filters;