import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/auth/Login";
import Cadastro from "../components/auth/Cadastro";
import Scanner from "../components/scanner/Scanner";
import Estoque from "../components/estoque/Estoque";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
