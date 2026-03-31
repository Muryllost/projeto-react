import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const navigate = useNavigate();

  const handleCadastro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nome.trim() !== "") {
      const operadores: string[] = JSON.parse(
        localStorage.getItem("listaOperadores") || "[]",
      );
      operadores.push(nome.trim());
      localStorage.setItem("listaOperadores", JSON.stringify(operadores));
      alert("Operador registado com sucesso!");
      navigate("/");
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
