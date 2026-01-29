import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditVoiture() {
  const [marque, setMarque] = useState("");
  const [model, setModel] = useState("");
  const [prix, setPrix] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);

  const { id } = useParams();
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
    try {
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("marque", marque);
      formData.append("model", model);
      formData.append("prix", prix);
      formData.append("status", status);
      if (image !== null) {
        formData.append("image", image);
      }

      await api.post(`/api/voiture/${id}`, formData).then(({ data }) => {
        console.log(data.message);
      });

      toast.success("Voiture modifié avec succès");
      navigate("/admin/voitures");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      await api.get(`/api/voiture/${id}`).then(({ data }) => {
        console.log(data.message);
        const { marque, model, prix, status } = data.voiture;
        setMarque(marque);
        setModel(model);
        setPrix(prix);
        setStatus(status);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleEdit();
  }, []);

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

export default EditVoiture;
