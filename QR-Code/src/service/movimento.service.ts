// src/service/movimento.service.ts
import { api } from "../utils/axios"; // Ajusta o caminho se o teu api.ts estiver noutro lugar
import type { Movimento } from "../types";

export const MovimentoService = {
  cadastrar: async (dados: Movimento) => {
    try {
      const response = await api.post("/movimentos", dados);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar movimento:", error);
      throw error;
    }
  },

  listarTodos: async () => {
    try {
      const response = await api.get("/movimentos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar movimentos:", error);
      throw error;
    }
  },
};
