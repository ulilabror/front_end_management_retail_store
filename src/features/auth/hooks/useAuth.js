import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout, registerUser } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = async (email, password) => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        return resultAction.payload; // Sukses login
      } else {
        throw resultAction.payload; // Gagal login
      }
    } catch (error) {
      return Promise.reject(error); // Return error ke komponen pemanggil
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const register = async (name, email, password, phone, role_id) => {
    try {
      const resultAction = await dispatch(
        registerUser({ name, email, password, phone, role_id })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        return resultAction.payload; // Sukses register
      } else {
        throw resultAction.payload; // Gagal register
      }
    } catch (error) {
      return Promise.reject(error); // Return error ke komponen pemanggil
    }
  };

  return {
    ...auth, // Spread state dari auth
    login,
    signOut,
    register,
  };
};
