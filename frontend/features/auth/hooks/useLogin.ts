import { useAuthStore } from "../auth.store";
import type { LoginFormData } from "../schemas/login.schema";
import { useLoginMutation } from "./mutations";

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const { login } = useLoginMutation();

  const handleLogin = async (payload: LoginFormData) => {
    const response = await login(payload);
    const user = response.user;

    loginStore({
      id: user._id,
      name: user.name,
      role: user.role,
    });

    return user;
  };
  return { handleLogin };
};
