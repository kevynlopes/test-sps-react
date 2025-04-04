import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles.css";
import Button from "../components/Button";

const API_URL = process.env.REACT_APP_SERVER_URL;

export async function userLoader({ params }) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/users/${params.userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { user: response.data };
  } catch (error) {
    throw new Error("Falha ao buscar os dados.");
  }
}

export default function EditUser() {
  const { user } = useLoaderData();
  const [name, setName] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(user.tipo);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/users/${user.email}`,
        { nome: name, email, tipo: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      setError("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <h1 className="users-title">Editar Usuário</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="form-edit">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <Button type="submit" className="btn">
          Salvar Alterações
        </Button>
      </form>
    </div>
  );
}
