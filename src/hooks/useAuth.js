import { useQuery } from "react-query";
import { auth } from "../Firebase";

const fetchUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      } else {
        localStorage.removeItem("user");
        resolve(null);
      }
      unsubscribe();
    });
  });
};

export const useAuth = () => {
  return useQuery("authUser", fetchUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
};
