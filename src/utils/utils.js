import api from "../api/api";
const logout = async () => {
  try {
    let response = await api.post("/api/logout", {});
    if (response.status === 200) {
      localStorage.removeItem("isAuth");
      window.location = "/";
    }
  } catch (err) {
    console.log(err);
  }
};

const checkAuth = async () => {
  try {
    await api.get("/api/user");
    localStorage.setItem("isAuth", true);
  } catch (err) {
    localStorage.removeItem("isAuth");
    window.location.pathname = "/login";
  }
};

export { logout, checkAuth };
