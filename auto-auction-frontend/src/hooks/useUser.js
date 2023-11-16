import { AuthContext } from "context/context";
import { useContext } from "react";
import { useSessionStorage } from "./useSessionStorage";

export const useUser = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { setItem, removeItem } = useSessionStorage();

  const addAuthUser = (user) => {
    setAuthUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeAuthUser = () => {
    setAuthUser(null);
    removeItem("user");
  };

  return { authUser, addAuthUser, removeAuthUser };
};
