import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import {
  Conta,
  CreateContaInput,
  UpdateContaInput,
  GetAllContasResponse,
  GetContaByIdResponse,
} from "../contas/types/types";

import { useAuth } from "../../context/AuthContext";

// Hook para obter todas as contas
export const useGetAllContas = () => {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContas = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllContasResponse>("/contas");
      setContas(response.data.registros);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar contas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  return { contas, loading, error, refetch: fetchContas };
};

// Hook para obter uma conta por ID
export const useGetContaById = (id: string | undefined) => {
  const [conta, setConta] = useState<Conta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConta = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetContaByIdResponse>(`/contas/${id}`);
      if (response.data.registro) {
        setConta(response.data.registro[0] || null);
      } else {
        setConta(null);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar a conta.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchConta();
  }, [fetchConta]);

  return { conta, loading, error, refetch: fetchConta };
};

export const useInsertConta = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertConta = async (newConta: CreateContaInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...newConta, usuario_id: user.id };
      const response = await api.post<Conta>("/contas", dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao inserir a conta.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertConta, loading, error };
};

// Hook para atualizar uma conta existente
export const useUpdateConta = () => {
  const { user } = useAuth(); // Acessa o usuário atual
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateConta = async (id: string, updatedConta: UpdateContaInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...updatedConta, usuario_id: user.id }; // Inclui o usuario_id
      const response = await api.put<Conta>(`/contas/${id}`, dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar a conta.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateConta, loading, error };
};

// Hook para deletar uma conta
export const useDeleteConta = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteConta = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/contas/${id}`);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a conta.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteConta, loading, error };
};
