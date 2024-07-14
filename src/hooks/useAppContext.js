import { useContext } from "react";
import { UserContext } from "../context/context";

const useAppContext = () => {
  return useContext(UserContext);
};

export default useAppContext;
