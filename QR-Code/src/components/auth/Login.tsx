import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Importamos o contexto
import { OperadorService } from "../../service/operador.service"; // Importamos o serviço
import "./Auth.css";

const Login: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const navigate = useNavigate();

  // Olha como fica limpo:
  const { login, isAuthenticated } = useAuth();

  // Se já estiver logado, vai para o scanner
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/scanner");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 1. Pede ao Back-end a lista de todos os operadores cadastrados
      const listaOperadores = await OperadorService.listarTodos();

      // 2. Procura se o nome digitado existe na lista que veio do banco
      const operadorEncontrado = listaOperadores.find(
        (op: any) => op.nome.toLowerCase() === nome.trim().toLowerCase(),
      );

      if (operadorEncontrado) {
        // 3. Se existir, usa o nosso AuthContext para logar
        login(operadorEncontrado);
        navigate("/scanner");
      } else {
        alert("Operador não encontrado! Por favor, efetua o registo primeiro.");
      }
    } catch (error) {
      console.error("Erro ao validar login:", error);
      alert("Erro ao conectar com o banco de dados.");
    }
  };

  return (
    <main className="container-login">
      <span className="material-symbols-outlined icone-grande">inventory</span>
      <h1>Controle de Logística</h1>
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
