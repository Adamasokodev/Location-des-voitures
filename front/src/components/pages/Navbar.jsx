import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../context/useAuthContext";

function NavBar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-white-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 tracking-wide"
        >
          🚗 LOCATION VOITURE
        </Link>

        <div className="flex gap-6 font-medium text-gray-700 items-center">
          {user ? (
            <>
              {/* Menu USER */}
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>

              {/* Menu ADMIN */}
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-blue-600 transition">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-6000 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
