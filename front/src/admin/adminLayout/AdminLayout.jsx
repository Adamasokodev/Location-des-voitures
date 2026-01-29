import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold text-blue-600">Admin</div>
        <nav className="flex flex-col gap-2 px-4">
          <Link to="/admin" className="block p-2 rounded hover:bg-blue-100">
            Dashboard
          </Link>
          <Link to="voitures" className="block p-2 rounded hover:bg-blue-100">
            Voitures
          </Link>

          <Link
            to="/admin/reservations"
            className="block p-2 rounded hover:bg-blue-100"
          >
            Réservations
          </Link>

          <Link
            to="/admin/clients"
            className="block p-2 rounded hover:bg-blue-100"
          >
            Clients
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
