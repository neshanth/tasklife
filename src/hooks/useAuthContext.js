import { useContext } from "react";
import { UserContext } from "../context/context";

const useAuthContext = () => {
  return useContext(UserContext);
};

export default useAuthContext;
