import "./filters.scss";
import useAppContext from "../../hooks/useAppContext";

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
          <div onClick={() => handleStatusChange("pending")} className={`tl-filters__btn-pending ${filters.status === "pending" ? "tl-filters--active" : ""}`}>
            <button>Pending</button>
            <span>{pendingTasks.length}</span>
          </div>
          <div onClick={() => handleStatusChange("completed")} className={`tl-filters__btn-completed  ${filters.status === "completed" ? "tl-filters--active" : ""}`}>
            <button>Completed</button>
            <span>{completedTasks.length}</span>
          </div>
        </div>
        <div className="tl-filters__date">
          <input type="date" />
        </div>
        <div className="tl-fitlers__tags">
          <button>Tags</button>
        </div>
      </div>
    </section>
  );
};
export default Filters;
