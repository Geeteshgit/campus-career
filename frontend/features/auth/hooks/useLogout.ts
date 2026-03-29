import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth.store";
import { useLogoutMutation } from "../api/auth.queries";
import { disconnectSocket } from "@/lib/socket";

export const useLogout = () => {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  const { logout, isPending: logoutPending } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      logoutStore();
      disconnectSocket();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return { handleLogout, logoutPending };
};
