import { useLoginMutation } from "../api/auth.queries";
import { useAuthStore } from "../auth.store";
import { LoginFormData } from "../schemas/login.schema";

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
