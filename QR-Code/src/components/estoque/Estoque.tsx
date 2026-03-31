import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { ItemEstoque } from "../../types";
import "./Estoque.css";

const Estoque: React.FC = () => {
  const navigate = useNavigate();
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("usuarioQR");
    if (!user) navigate("/");
    else setEstoque(JSON.parse(localStorage.getItem("estoqueQR") || "[]"));
  }, [navigate]);

  return (
    <div className="estoque-container">
      <header>
        <Link to="/scanner">
          <span className="material-symbols-outlined">qr_code_scanner</span>
          Escanear
        </Link>
        <Link to="/estoque" className="active">
          2<span className="material-symbols-outlined">local_shipping</span>
          Logística
        </Link>
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("usuarioQR");
            navigate("/");
          }}
        >
          <span className="material-symbols-outlined">logout</span>Sair
        </button>
      </header>

      <main>
        <h2>Histórico de Movimentações</h2>
        <ul className="lista-estoque">
          {estoque.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              Nenhum histórico ainda.
            </p>
          ) : (
            estoque.map((item, index) => (
              <li
                key={index}
                className="item-estoque"
                style={{
                  borderLeft: `5px solid ${item.tipo === "ENTRADA" ? "#00ffcc" : "#ff4c4c"}`,
                }}
              >
                <div>
                  <span className="codigo">
                    {item.nomeProduto} ({item.codigo})
                  </span>{" "}
                  <br />
                  <span className="rota-tag">
                    🛫 De: <strong>{item.origem}</strong> | 🛬 Para:{" "}
                    <strong>{item.destino}</strong>
                  </span>
                  <span
                    className={
                      item.tipo === "ENTRADA" ? "tag-entrada" : "tag-saida"
                    }
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      {item.tipo === "ENTRADA"
                        ? "arrow_downward"
                        : "arrow_upward"}
                    </span>{" "}
                    {item.tipo}
                  </span>
                  <span className="operador-tag">
                    👤 Por: {item.operador} | 🕒 {item.data}
                  </span>
                </div>
                <div className="quantidade-tag">{item.quantidade}x</div>
              </li>
            ))
          )}
        </ul>
        {estoque.length > 0 && (
          <button
            className="btn-danger"
            onClick={() => {
              if (window.confirm("Apagar tudo?")) {
                localStorage.removeItem("estoqueQR");
                setEstoque([]);
              }
            }}
          >
            Limpar Dados
          </button>
        )}
      </main>
    </div>
  );
};

export default Estoque;
