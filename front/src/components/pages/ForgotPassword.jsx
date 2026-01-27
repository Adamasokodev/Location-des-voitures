import React, { useState } from "react";
import api from "../../Api/api";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      setErrors([]);
      setStatus(null);

      const res = await api.post("/forgot-password", { email });
      setStatus(res.data.status);
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <p className="text-xl font-semibold text-center mb-6"></p>

        <div className="mb-3">
          {status && <span className="bg-green-300 rounded p-2">{status}</span>}
        </div>

        <form className="space-y-4" onSubmit={handlePassword}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Enter your email address and we'll send you an email with
              instructions to reset your password.
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Forgot
          </button>
        </form>
        <p className="text-center text-gray-500 text-bold mt-4">
          <span className="flex justify-between text-blue-600  hover:underline cursor-pointer">
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
