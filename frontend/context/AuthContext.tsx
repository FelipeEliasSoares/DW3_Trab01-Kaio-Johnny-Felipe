//* use client para rodar no browser do usuário
"use client";

//* Importando os hooks necessários do react e do next
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

//* Importando o hook useRouter do next para redirecionar o usuário
import { useRouter } from "next/navigation";

//* Importando o axios para fazer requisições HTTP
import axios from "axios";

//* Importando os tipos de dados
import { User, AuthContextType } from "./types/types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Efeito para verificar a sessão do usuário
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<{ user: User }>(
          "http://localhost:4000/api/auth/me",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { data }: { data: { auth: boolean } } = await axios.post(
        "http://localhost:4000/login",
        { username, password },
        { withCredentials: true } // Inclui cookies nas requisições
      );

      if (data.auth) {
        // Após o login, buscar os dados do usuário
        const { data: userData }: { data: { user: User } } = await axios.get(
          "http://localhost:4000/api/auth/me",
          {
            withCredentials: true,
          }
        );
        setUser(userData.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/login"); // Redirecionar após logout
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
