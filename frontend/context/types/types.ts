//* Definindo os tipos de dados que serão utilizados
export type User = {
  username: string;
};

//* Definindo o tipo do contexto de autenticação
export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (UserName: string, Password: string) => Promise<void>;
  logout: () => Promise<void>;
};
