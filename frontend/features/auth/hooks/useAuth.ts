import { useEffect } from "react";
import { useMeQuery } from "../api/auth.queries";
import { useAuthStore } from "../auth.store";

export const useAuthInit = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const currentUser = useAuthStore((state) => state.user);

  const {
    data: userData,
    isPending: userDataLoading,
    isError: userDataError,
    error: userDataErrorObj,
  } = useMeQuery();

  const user = userData?.user;

  useEffect(() => {
    if (user && user._id !== currentUser?.id) {
      login({
        id: user._id,
        name: user.name,
        role: user.role,
      });
    }
  }, [user, currentUser, login]);

  useEffect(() => {
    if (userDataError) {
      logout();
    }
  }, [userDataError, logout]);

  return {
    user,
    userLoading: userDataLoading,
    userError: userDataError,
    userErrorObj: userDataErrorObj,
  };
};
