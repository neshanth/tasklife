import axios from "axios";
import history from "../history";
const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let status = error.response.status;

    if (status === 401 || status === 419) {
      localStorage.removeItem("isAuth");
      history.push("/");
    }
    return Promise.reject(error);
  }
);

export default api;
