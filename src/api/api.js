import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
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
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
