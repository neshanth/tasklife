import "./filters.scss";
import useAppContext from "../../hooks/useAppContext";
import Icons from "../Icons/Icons";
import Search from "../Search/Search";

const Filters = ({ pendingTasks, completedTasks }) => {
  const { filters, setFilters } = useAppContext();
  const handleStatusChange = (type) => {
    const updatedFilters = { ...filters };
    if (type === "pending") {
      setFilters({
        ...updatedFilters,
        status: "pending",
      });
    } else {
      setFilters({
        ...updatedFilters,
        status: "completed",
      });
    }
  };

  return (
    <section className="tl-filters">
      <div className="tl-filters__options">
        <div className="tl-filters__status-button">
          <div className={`tl-filters__btn-pending filters-padding ${filters.status === "pending" ? "tl-filters--active" : ""}`} onClick={() => handleStatusChange("pending")}>
            <button>Pending</button>
            <span>{pendingTasks.length}</span>
          </div>
          <div className={`tl-filters__btn-completed filters-padding  ${filters.status === "completed" ? "tl-filters--active" : ""}`} onClick={() => handleStatusChange("completed")}>
            <button>Completed</button>
            <span>{completedTasks.length}</span>
          </div>
        </div>
        <div className="tl-filters__date tl-border filters-padding">
          <Icons type="calendar" w="20" h="20" />
          <button>Date</button>
        </div>
        <div className="tl-filters__tags tl-border filters-padding">
          <Icons type="tag" w="20" h="20" />
          <button>Tags</button>
        </div>
      </div>
      <Search />
    </section>
  );
};
export default Filters;
