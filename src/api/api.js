import axios from "axios";
import history from "../history/history";
import { redirectPageBasedOnUrl } from "../utils/utils";
console.log(process.env.REACT_APP_BASE_URL);
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
    let pathName = history.location.pathname;
    if (status === 401 || status === 419) {
      localStorage.removeItem("isAuth");
      redirectPageBasedOnUrl(pathName);
    }
    return Promise.reject(error);
  }
);

export default api;
