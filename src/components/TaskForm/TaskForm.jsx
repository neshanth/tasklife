import { useEffect, useRef, useState } from "react";
import Icons from "../Icons/Icons";
import "react-datepicker/dist/react-datepicker.css";
import useAppContext from "../../hooks/useAppContext";
import { handleDateIfDateIsEmpty, renderToast } from "../../utils/utils";
import api from "../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TLModal from "../TLModal/TLModal";
import DatePickerWrapper from "../DatePickerWrapper/DatePickerWrapper";
import SelectWrapper from "../SelectWrapper/SelectWrapper";
import "./taskform.scss";
const TaskForm = ({ getTasks, setTasks, tasks, handleTaskDelete }) => {
  const TASK_DATA = {
    task: "",
    description: "",
    due_date: "",
    tags: [],
    id: "",
    status: 0,
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { allTags, user, taskFormAction, setTaskFormAction, isMobile } = useAppContext();
  const [taskData, setTaskData] = useState(TASK_DATA);
  const [startDate, setStartDate] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (id) {
      const taskData = tasks.find((task) => task.id === parseInt(id));
      setTaskData(taskData);
      setStartDate(taskData?.due_date ? new Date(taskData.due_date) : null);
      setSelectedTags(taskData?.tags ? taskData.tags : []);
    }
  }, [id]);

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [id, taskFormAction]);

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

  const handleTaskEditFromView = () => {
    setTaskFormAction("edit");
  };

  const handleTaskDeleteFromView = (e, id) => {
    handleTaskDelete(e, id);
    navigate(location.state?.previousLocation?.pathname || -1);
  };

  const handleFormClose = () => {
    const path = location?.state?.previousLocation?.pathname || -1;
    navigate(path);
  };

  const taskFormTitle = taskFormAction === "create" ? "New" : taskFormAction === "edit" ? "Edit" : "View";
  let taskFormActionButtons = [];
  if (taskFormAction !== "view") {
    taskFormActionButtons = [
      {
        label: "Cancel",
        action: handleCancelButton,
        className: "tl-task__form-cancel tl-btn--secondary",
      },
      {
        label: "Save",
        action: handleTaskAddOrUpdate,
        className: "tl-task__form-save tl-btn--primary",
      },
    ];
  } else {
    taskFormActionButtons = [
      {
        label: "Edit",
        action: handleTaskEditFromView,
        className: "tl-task__form-edit tl-btn--primary",
      },
      {
        label: "Delete",
        action: (e) => handleTaskDeleteFromView(e, id),
        className: "tl-task__form-delete tl-btn__delete",
      },
    ];
  }

  // Status Options
  const statusOptions = [
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
  ];

  return (
    <TLModal handleCloseBtnClick={handleFormClose} page={taskFormTitle} showClose={true} buttons={taskFormActionButtons} onCancel={handleCancelButton} onSave={handleTaskAddOrUpdate}>
      <form className="tl-task__form-wrapper">
        <div className="tl-task__form">
          <div className={`tl-task__form-container`}>
            <div className={`tl-task__form-name-desc ${taskFormAction !== "view" ? "tl-border" : ""} ${taskFormAction}-mode`}>
              <div className="tl-task__form-task-name">
                {taskFormAction === "view" && <p>{taskData.task}</p>}
                {taskFormAction !== "view" && <input value={taskData.task} onChange={handleTaskFormChange} name="task" type="text" placeholder="Name of the Task" ref={inputRef} />}
              </div>
              <div className="tl-task__form-task-desc">
                {taskFormAction === "view" && taskData.description && <p>{taskData.description}</p>}
                {taskFormAction !== "view" && (
                  <input value={taskData.description ? taskData.description : ""} onChange={handleTaskFormChange} name="description" type="text" placeholder="Description of the Task" />
                )}
              </div>
            </div>
            <div className="tl-task__form-info">
              {taskFormAction !== "create" && (
                <div className="tl-task__form-task-status">
                  {taskData.status ? <Icons type="circle-filled" w="20" h="20" /> : <Icons type="circle" w="20" h="20" />}
                  <SelectWrapper
                    components={taskFormAction === "view" && { DropdownIndicator: () => null }}
                    isDisabled={taskFormAction === "view"}
                    onChange={handleTaskFormChange}
                    value={taskData.status ? { value: 1, label: "Completed" } : { value: 0, label: "Pending" }}
                    options={statusOptions}
                    name="status"
                  />
                </div>
              )}

              <DatePickerWrapper isClearable={taskFormAction !== "view" ? true : false} startDate={startDate} handleDatePicker={handleDatePicker} taskFormAction={taskFormAction} />
              <div className="tl-task__form-tags-wrapper">
                <Icons w="25px" h="25px" type="tag" />
                <SelectWrapper
                  components={taskFormAction === "view" && { DropdownIndicator: () => null, ClearIndicator: () => null, MultiValueRemove: () => null }}
                  onChange={handleChange}
                  value={selectedTags}
                  options={allTags}
                  isDisabled={taskFormAction === "view"}
                  isMulti={true}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </TLModal>
  );
};
export default TaskForm;
