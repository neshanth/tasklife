import api from "../api/api";
import history from "../history";

const logout = async () => {
  try {
    let response = await api.post("/api/logout", {});
    if (response.status === 200) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      history.push("/");
    }
  } catch (err) {
    console.log(err);
  }
};

const updateTaskStatusApi = async (id) => {
  try {
    await api.patch(`/api/tasks/status/${id}`);
  } catch (err) {
    console.log(err);
  }
};

const getHour = () => {
  let currentDate = new Date();
  let hour = currentDate.getHours();
  return hour;
};

const getSalutation = () => {
  let hour = getHour();
  if (hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 16) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};

export { logout, updateTaskStatusApi, getSalutation };
