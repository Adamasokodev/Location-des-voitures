import React from "react";
import useAuthContext from "../../context/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
  const { user } = useAuthContext();
  return !user ? <Outlet /> : <Navigate to="/" />;
}

export default GuestLayout;
