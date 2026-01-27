import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../context/useAuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors, setErrors } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedUser = await login({ email, password });
    if (loggedUser) {
      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    setErrors();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Se connecter</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="exemple@email.com"
            />
            {errors?.email && (
              <span className="text-red-400">{errors.email[0]}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            {errors?.email && (
              <span className="  rounded text-red-400">{errors.email[0]}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Pas encore de compte?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            <Link to="/register">S'inscrire</Link>
          </span>
        </p>
        <p className="text-center text-gray-500 text-sm mt-4">
          <span className="text-blue-600 hover:underline cursor-pointer">
            <Link to="/forgot-password">Mot de passe oublié </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
