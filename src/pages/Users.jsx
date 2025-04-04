import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./../styles.css";
import Button from "../components/Button";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, [token, navigate]);

  async function fetchUsers() {
    try {
      const data = await UserService.list(token);
      setUsers(data);
    } catch (error) {
      setError("Erro ao carregar usuários. Tente novamente.");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      await UserService.delete(userToDelete.email, token);
      setShowDeleteModal(false);
      window.location.href = "/users";
      fetchUsers();
    } catch (error) {
      window.location.href = "/users";

      setError("Erro ao excluir usuário. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="users-header">
        <h1 className="users-title">Usuários</h1>
        <div>
          <Button
            onClick={() => navigate("/users/new")}
            className="btn create-btn"
          >
            Criar Usuário
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="btn logout-btn"
          >
            Sair
          </Button>
        </div>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.tipo}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    onClick={() => navigate(`/users/${user.email}/edit`)}
                    className="action-btn edit-btn"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => {
                      setUserToDelete(user);
                      setShowDeleteModal(true);
                    }}
                    className="action-btn delete-btn"
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja excluir o usuário {userToDelete?.nome}?
            </p>
            <div className="modal-actions">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="btn cancel-btn"
              >
                Cancelar
              </Button>
              <Button onClick={handleDelete} className="btn delete-btn">
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
