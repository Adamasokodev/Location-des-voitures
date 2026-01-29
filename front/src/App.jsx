import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import ForgotPassword from "./components/pages/ForgotPassword";
import AdminRoute from "./components/adminRoute/AdminRoute";
import AdminLayout from "./admin/adminLayout/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Voiture from "./admin/voitures/Voiture";
import CreateVoiture from "./admin/voitures/CreateVoiture";
import EditVoiture from "./admin/voitures/EditVoiture";

function App() {
  return (
    <div>
      <Toaster
        position="top right"
        toastOptions={{
          duration: 400,
        }}
        reverseOrder={false}
      />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="voitures" element={<Voiture />} />
            <Route path="voitures/create" element={<CreateVoiture />} />
            <Route path="voitures/edit/:id" element={<EditVoiture />} />
          </Route>
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
