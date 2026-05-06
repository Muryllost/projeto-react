import React, { createContext, useContext, useState, useEffect } from "react";
import type { Operador } from "../types"; // Importamos o molde do novo projeto

interface AuthContextType {
  operador: Operador | null;
  login: (operadorData: Operador) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [operador, setOperador] = useState<Operador | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Usamos uma chave específica para não misturar com outros projetos locais
      const storedOperador = localStorage.getItem("@ScanStock:operador");

      if (storedOperador) {
        setOperador(JSON.parse(storedOperador));
      }
    } catch (error) {
      console.error(
        "Falha ao analisar os dados do operador do localStorage",
        error,
      );
      localStorage.removeItem("@ScanStock:operador");
    }

    setLoading(false);
  }, []);

  const login = (operadorData: Operador) => {
    setOperador(operadorData);
    localStorage.setItem("@ScanStock:operador", JSON.stringify(operadorData));
  };

  const logout = () => {
    setOperador(null);
    localStorage.removeItem("@ScanStock:operador");
  };

  const isAuthenticated = !!operador;

  return (
    <AuthContext.Provider
      value={{ operador, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// O teu Hook customizado!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
