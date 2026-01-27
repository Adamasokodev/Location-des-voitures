import React from "react";
import useAuthContext from "../../context/useAuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;
  if (user?.role !== "admin") return <Navigate to="/"/>;

  return children;
}

export default AdminRoute;
