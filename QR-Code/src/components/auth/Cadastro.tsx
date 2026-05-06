import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OperadorService } from "../../service/operador.service"; // Importamos o mensageiro
import type { Operador } from "../../types"; // Importamos o molde
import "./Auth.css";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nome.trim() !== "") {
      try {
        // 1. Criamos o objeto no formato correto do banco
        const novoOperador: Operador = {
          nome: nome.trim(),
          status: "1", // '1' para ativo
        };

        // 2. Enviamos para o Back-end real
        await OperadorService.cadastrar(novoOperador);

        alert("Operador registado com sucesso!");
        navigate("/"); // Redireciona para o login
      } catch (error) {
        console.error("Erro ao cadastrar operador:", error);
        alert("Ops! Ocorreu um erro ao comunicar com o servidor.");
      }
    }
  };

  return (
    <main className="container-login">
      <span className="material-symbols-outlined icone-grande">person_add</span>
      <h1>Novo Operador</h1>
      <p>Regista a tua identificação para usar o sistema</p>
      <form onSubmit={handleCadastro}>
        <div className="input-wrapper">
          <label htmlFor="novo-nome">O teu Nome ou Matrícula:</label>
          <input
            type="text"
            id="novo-nome"
            placeholder="Escreve o teu nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Salvar Registo
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => navigate("/")}
        >
          Voltar para o Login
        </button>
      </form>
    </main>
  );
};

export default Cadastro;
