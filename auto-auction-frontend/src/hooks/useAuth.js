import { useEffect } from "react";
import { useSessionStorage } from "./useSessionStorage";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { authUser, addAuthUser, removeAuthUser } = useUser();
  const { getItem } = useSessionStorage();

  useEffect(() => {
    const authUser = getItem("user");
    if (authUser) {
      addAuthUser(JSON.parse(authUser));
    }
  }, []);

  const login = (authUser) => {
    addAuthUser(authUser);
  };

  const logout = () => {
    removeAuthUser();
  };

  return { authUser, login, logout };
};
