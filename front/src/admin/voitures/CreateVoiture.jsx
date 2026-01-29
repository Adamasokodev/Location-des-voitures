import React, { useState } from "react";
import api from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateVoiture() {
  const [marque, setMarque] = useState("");
  const [model, setModel] = useState("");
  const [prix, setPrix] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const statusOptions = [
    { value: "available", label: "Disponible" },
    { value: "booked", label: "Réservé" },
    { value: "maintenance", label: "En maintenance" },
    { value: "unavailable", label: "Indisponible" },
  ];

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("marque", marque);
    formData.append("model", model);
    formData.append("prix", prix);
    formData.append("status", status);
    formData.append("image", image);

    await api.post("/api/voiture", formData).then(({ data }) => {
      console.log(data.message);
    });

    toast.success("Voiture ajouté avec success");

    navigate("/admin/voitures");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Ajouter une voiture
          </h2>

          <Link
            to="/admin/voitures"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Retour
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Marque
            </label>
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Toyota"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Modèle
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Corolla"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Prix</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 15000"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option>Sélectionnez</option>
              {statusOptions.map((st, index) => (
                <option key={index} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full text-gray-700"
              accept="image/*"
              required
            />
          </div>

          {/* Bouton Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVoiture;
