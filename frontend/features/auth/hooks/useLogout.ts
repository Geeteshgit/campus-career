import { useAuthStore } from "../auth.store";
import { useLogoutMutation } from "../api/auth.queries";
import { disconnectSocket } from "@/lib/socket";

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);

  const { logout, isPending: logoutPending } = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    logoutStore();
    disconnectSocket();
  };
  
  return { handleLogout, logoutPending };
};
