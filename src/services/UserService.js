import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

class UserService {
  async list(token) {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async create(data, token) {
    const response = await axios.post(`${API_URL}/users`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async delete(email, token) {
    await axios.delete(`${API_URL}/users/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async update(email, data, token) {
    const response = await axios.put(
      `${API_URL}/users/${encodeURIComponent(email)}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  async get(email, token) {
    const response = await axios.get(
      `${API_URL}/users/${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

export default new UserService();
