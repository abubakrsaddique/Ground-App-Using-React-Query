import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { auth } from "../Firebase";

// Create AuthContext
export const AuthContext = createContext();

// Define the function to fetch the authenticated user
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

// Create a custom hook for using Auth
export const useAuth = () => {
  return useQuery("authUser", fetchUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
};

// Define the AuthProvider component
function AuthProvider({ children }) {
  const { data: user, isLoading, refetch } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const logout = () => {
    auth.signOut().then(() => {
      refetch();
    });
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Create and configure QueryClient
const queryClient = new QueryClient();

// Define the AppProviders component
export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
