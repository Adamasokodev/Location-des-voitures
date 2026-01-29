import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Voiture() {
  const [voiture, setVoiture] = useState();

  const fetchData = async () => {
    await api.get("/api/voiture").then(({ data }) => {
      console.log(data.voitures);
      setVoiture(data.voitures);
    });
  };

  const handleDelete = async (id) => {
    try {
      const supprime = window.confirm("Voulez vous supprimé ? ");
      if (!supprime) {
        return;
      }

      await api.delete(`/api/voiture/${id}`).then(({ data }) => {
        console.log(data.message);
        fetchData();
        toast.success("Voiture supprimé avec succès !");
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Liste des voitures
        </h2>
        <Link
          to="create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          ➕ Ajouter voiture
        </Link>
      </div>

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden mt-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Id
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Marque
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Model
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Prix
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {voiture &&
            voiture.map((v, key) => (
              <tr key={key} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-700">{v.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{v.marque}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{v.model}</td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">
                  {v.prix} MRO
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${v.status === "available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center">
                  <img
                    src={`http://127.0.0.1:8000/storage/voitures/images/${v.image}`}
                    alt=""
                    className="w-12 h-12 object-cover rounded shadow"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-center">
                    <Link
                      to={`edit/${v.id}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      title="modifier"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-300 w-8 h-8 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Voiture;
