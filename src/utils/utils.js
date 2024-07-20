import { toast } from "react-toastify";
import api from "../api/api";
import history from "../history/history";

const handleApiResponse = async (fn) => {
  try {
    const reponse = await fn();
    return reponse;
  } catch (err) {
    throw err
  }
};

const updateTaskStatusApi = (id) => handleApiResponse(() => api.patch(`/api/tasks/status/${id}`));
const getTasksResponse = () => handleApiResponse(() => api.get("/api/tasks"));
const handleTaskDeleteResponse = (id) => handleApiResponse(() => api.delete(`/api/tasks/${id}`));

export const checkObjectChangeCount = (obj1, obj2) => {
  let count = 0;
  if (obj1.task !== obj2.task || obj1.due_date !== obj2.due_date || obj1.status !== obj2.status || obj1.description !== obj2.description) {
    count++;
  }
  return count;
};

export const redirectPageBasedOnUrl = (currentPath) => {
  if (currentPath === "/login") {
    history.push("/login");
  } else if (currentPath === "/register") {
    history.push("/register");
  } else {
    history.push("/");
  }
};

const verifyCookie = async () => {
  handleApiResponse(() => api.get("/sanctum/csrf-cookie"));
};

const getTags = () => handleApiResponse(() => api.get("/api/tags"));
const renderToast = (msg, type) => {
  let classNames = ""
  if (type === "error") {
    classNames = "error-toast"
  } else if (type === "success") {
    classNames = "success-toast"
  }
  const options = {
    hideProgressBar: true,
    className: classNames,
  }
  toast(msg, options);
}

export const handleDateIfDateIsEmpty = () => {
  let currentDate = new Date()
  // T is the separator between date and time
  return currentDate.toISOString().split("T")[0]
}

export { updateTaskStatusApi, getTasksResponse, handleTaskDeleteResponse, handleApiResponse, verifyCookie, getTags, renderToast };
