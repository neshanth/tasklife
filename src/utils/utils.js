import api from "../api/api";
import history from "../history/history";

const updateTaskStatusApi = async (id) => {
  try {
    const response = await api.patch(`/api/tasks/status/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const checkObjectChangeCount = (obj1, obj2) => {
  let count = 0;
  if (obj1.task !== obj2.task || obj1.due_date !== obj2.due_date || obj1.status !== obj2.status) {
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

export { updateTaskStatusApi };
