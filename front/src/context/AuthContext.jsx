/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import api from "../Api/api";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  }, []);

  const getUser = async () => {
    const { data } = await api.get("/api/user");
    setUser(data);
    return data;
  };

  const login = async ({ ...data }) => {
    try {
      await api.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      await api.post("/login", data);
      console.log("Vous étes connecté !");
      const res = await getUser();
      return res;
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const register = async ({ ...data }) => {
    try {
      await api.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      await api.post("/register", data);
      console.log("Votre compte à été crée !");
      getUser();
      return true;
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
      return false;
    }
  };

  const logout = async () => {
    await api.post("/logout").then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{ getUser, login, register, logout, user, errors, setErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
