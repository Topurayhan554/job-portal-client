import { useContext } from "react";
import { AuthContext } from "../context/Authcontext/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      loading: true,
      setUser: () => {},
      signUpFunc: () => {},
      signInFunc: () => {},
      signInGoogle: () => {},
      logOut: () => {},
      updateUserProfile: () => {},
      saveUserToDB: () => {},
      syncUserWithDatabase: () => {},
      refreshUser: () => {},
    };
  }

  return context;
};

export default useAuth;
