import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("usuarioQR")) navigate("/scanner");
  }, [navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operadores: string[] = JSON.parse(
      localStorage.getItem("listaOperadores") || "[]",
    );
    if (operadores.includes(nome) || operadores.length === 0) {
      localStorage.setItem("usuarioQR", nome);
      navigate("/scanner");
    } else {
      alert("Operador não encontrado! Por favor, efetua o registo primeiro.");
    }
  };

  return (
    <main className="container-login">
      <span className="material-symbols-outlined icone-grande">inventory</span>
      <h1>Controlo de Logística</h1>
      <p>Identifica-te para começar</p>
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="input-nome">Nome do Operador:</label>
          <input
            type="text"
            id="input-nome"
            placeholder="Ex: João Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Entrar no Sistema
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => navigate("/cadastro")}
        >
          Cadastrar Operador
        </button>
      </form>
    </main>
  );
};
export default Login;
