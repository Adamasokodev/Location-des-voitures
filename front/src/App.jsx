import { Route, Routes } from "react-router-dom";
import NavBar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import ForgotPassword from "./components/pages/ForgotPassword";
import AdminRoute from "./components/adminRoute/AdminRoute";
import Voiture from "./voitures/Voiture";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Voiture />
              </AdminRoute>
            }
          />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
