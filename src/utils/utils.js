import api from "../api/api";
import history from "../history/history";

const handleApiResponse = async (fn) => {
  try {
    const reponse = await fn();
    return reponse;
  } catch (err) {
    console.log(err);
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

export { updateTaskStatusApi, getTasksResponse, handleTaskDeleteResponse, handleApiResponse, verifyCookie };
