import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">SPS REACT TEST</h1>
        <p className="home-subtitle">
          Desafio de Desenvolvedor React - Kevyn Lopes
        </p>

        <Link to="/login" className="login-button">
          Acessar Tela de Login
        </Link>
      </div>
    </div>
  );
}
