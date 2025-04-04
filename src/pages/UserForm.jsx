import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import "./../styles.css";
import Button from "../components/Button";

export default function UserForm() {
  const { email } = useParams();
  const isEditing = !!email;
  const [name, setName] = useState("");
  const [emailState, setEmailState] = useState("");
  const [type, setType] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
  }, [isEditing, email]);

  async function loadUser() {
    try {
      const user = await UserService.get(email, token);
      setName(user.nome);
      setEmailState(user.email);
      setType(user.tipo);
    } catch (error) {
      setError("Erro ao carregar usuário. Tente novamente.");
      console.error("Erro ao carregar usuário:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const userData = {
        nome: name,
        email: emailState,
        tipo: type,
      };

      if (isEditing) {
        await UserService.update(email, userData, token);
        setSuccess("Usuário atualizado com sucesso!");
      } else {
        await UserService.create({ ...userData, senha: password }, token);
        setSuccess("Usuário criado com sucesso!");
      }

      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      setError(
        error.response?.data?.message ||
          "Erro ao salvar usuário. Tente novamente."
      );
    }
  };

  return (
    <div className="container">
      <h1 className="users-title">
        {isEditing ? "Editar Usuário" : "Criar Usuário"}
      </h1>

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
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
            required
            disabled={isEditing}
          />
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {!isEditing && (
          <>
            <div className="form-group">
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirmar Senha:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="form-actions">
          <Button
            type="button"
            onClick={() => navigate("/users")}
            className="btn cancel-btn"
          >
            Cancelar
          </Button>
          <Button type="submit" className="btn">
            {isEditing ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
