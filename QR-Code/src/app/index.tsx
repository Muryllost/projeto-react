import React, { type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "../context/AuthContext"; // Importa o contexto
import Login from "../components/auth/Login";
import Cadastro from "../components/auth/Cadastro";
import Scanner from "../components/scanner/Scanner";
import Estoque from "../components/estoque/Estoque";

// Componente para proteger as rotas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { operador, loading } = useAuth();

  if (loading) return <div>Carregando...</div>; // Evita piscar a tela enquanto checa o localStorage

  return operador ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* 1. O Provider envolve TUDO */}
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas Protegidas (Só entra se estiver logado) */}
          <Route
            path="/scanner"
            element={
              <PrivateRoute>
                <Scanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <PrivateRoute>
                <Estoque />
              </PrivateRoute>
            }
          />

          {/* Redireciona qualquer rota errada para o Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
