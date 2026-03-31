import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import type { ItemEstoque } from "../../types";
import "./Scanner.css";

const Scanner: React.FC = () => {
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [usuarioAtual, setUsuarioAtual] = useState<string>("");
  const [cameraAtiva, setCameraAtiva] = useState<boolean>(false);
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  const [codigoPendente, setCodigoPendente] = useState<string>("");
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [origem, setOrigem] = useState<string>("");
  const [destino, setDestino] = useState<string>("");
  const [tipo, setTipo] = useState<string>("ENTRADA");
  const [quantidade, setQuantidade] = useState<number>(1);

  useEffect(() => {
    const user = localStorage.getItem("usuarioQR");
    if (!user) navigate("/");
    else setUsuarioAtual(user);
    return () => pararCamera();
  }, [navigate]);

  const iniciarCamera = () => {
    if (cameraAtiva) return;
    if (!scannerRef.current) scannerRef.current = new Html5Qrcode("reader");

    scannerRef.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          pararCamera();
          setCodigoPendente(decodedText);
          setQuantidade(1);
          setModalAberto(true);
        },
        () => {},
      )
      .then(() => setCameraAtiva(true))
      .catch(console.error);
  };

  const pararCamera = () => {
    if (scannerRef.current && cameraAtiva) {
      scannerRef.current
        .stop()
        .then(() => setCameraAtiva(false))
        .catch(console.error);
    }
  };

  const handleSalvarMovimento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const estoque: ItemEstoque[] = JSON.parse(
      localStorage.getItem("estoqueQR") || "[]",
    );

    estoque.push({
      codigo: codigoPendente,
      nomeProduto,
      origem,
      destino,
      tipo,
      quantidade: Number(quantidade),
      data: new Date().toLocaleString("pt-PT"),
      operador: usuarioAtual,
    });
    localStorage.setItem("estoqueQR", JSON.stringify(estoque));

    setNomeProduto("");
    setOrigem("");
    setDestino("");
    setModalAberto(false);
    iniciarCamera();
  };

  return (
    <div className="scanner-container">
      <header>
        <Link to="/scanner" className="active">
          <span className="material-symbols-outlined">qr_code_scanner</span>
          Escanear
        </Link>
        <Link to="/estoque">
          <span className="material-symbols-outlined">local_shipping</span>
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
        <h2>Leitor de Produtos</h2>
        <p>
          Operador: <strong style={{ color: "#ffca28" }}>{usuarioAtual}</strong>
        </p>
        <div
          id="reader"
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
            border: "3px solid #ffca28",
            borderRadius: "15px",
          }}
        ></div>
        <button className="btn btn-danger" onClick={pararCamera}>
          Parar Câmara
        </button>
        <button className="btn" onClick={iniciarCamera}>
          Ligar Câmara
        </button>
      </main>

      {modalAberto && (
        <dialog open>
          <form onSubmit={handleSalvarMovimento}>
            <h2>Registar Rota</h2>
            <p>
              Código:{" "}
              <strong style={{ color: "#ffca28" }}>{codigoPendente}</strong>
            </p>
            <div className="modal-input-wrapper">
              <label>Nome do Produto:</label>
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                required
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="modal-input-wrapper" style={{ width: "50%" }}>
                <label>Origem:</label>
                <input
                  type="text"
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value)}
                  required
                />
              </div>
              <div className="modal-input-wrapper" style={{ width: "50%" }}>
                <label>Destino:</label>
                <input
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-input-wrapper">
              <label>Tipo:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="ENTRADA">Entrada</option>
                <option value="SAIDA">Saída</option>
              </select>
            </div>
            <div className="modal-input-wrapper">
              <label>Qtd:</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                min="1"
                required
              />
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setModalAberto(false);
                  iniciarCamera();
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};
export default Scanner;
