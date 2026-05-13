// src/service/operador.service.ts
import { api } from "../utils/axios"; // Ajusta o caminho se o teu api.ts estiver noutro lugar
import type { Operador } from "../types";

export const OperadorService = {
  // Envia os dados para cadastrar um novo operador no Back-end
  cadastrar: async (dados: Operador) => {
    try {
      const response = await api.post("/operador", dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar operador:", error);
      throw error;
    }
  },

  // Busca todos os operadores cadastrados no banco
  listarTodos: async () => {
    try {
      const response = await api.get("/operadores");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar operadores:", error);
      throw error;
    }
  },
};
