import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PublicRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoute;
