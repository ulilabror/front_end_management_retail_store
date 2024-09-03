import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout, registerUser } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = (email, password) => {
    dispatch(loginUser({ email, password }));
  };

  const signOut = () => {
    dispatch(logout());
  };

  const register = (name, email, password, phone, role_id) => {
    dispatch(registerUser({ name, email, password, phone, role_id }));
  };

  return {
    ...auth,
    login,
    signOut,
    register,
  };
};
