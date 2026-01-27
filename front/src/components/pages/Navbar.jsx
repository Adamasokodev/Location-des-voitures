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
    <div className="bg-blue-500 p-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">LOCATION</h2>

        <div className="flex gap-6 font-semibold items-center">
          {user ? (
            <>
              {/* Menu USER */}
              <Link to="/">Home</Link>

              {/* Menu ADMIN */}
              {user.role === "admin" && <Link to="/admin">Dashboard</Link>}

              <button
                onClick={handleLogout}
                className="cursor-pointer bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
