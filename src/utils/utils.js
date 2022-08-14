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

export { logout };
