import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
