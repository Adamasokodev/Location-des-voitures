import React from "react";
import useAuthContext from "../../context/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";

function AuthLayout() {
  const { user } = useAuthContext();
  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default AuthLayout;
