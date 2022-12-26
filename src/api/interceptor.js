import api from "./api";
import history from "../history/history";
import { redirectPageBasedOnUrl } from "../utils/utils";

const interceptor = (setAuth) => {
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let status = error.response.status;
      let pathName = history.location.pathname;
      if (status === 401 || status === 419) {
        setAuth(false);
        redirectPageBasedOnUrl(pathName);
      }
      return Promise.reject(error);
    }
  );
};

export default interceptor;
