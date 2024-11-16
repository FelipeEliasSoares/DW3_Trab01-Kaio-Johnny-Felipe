// app/dashboard/conta/[id]/view/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Registro {
  id: number;
  descricao: string;
  tipo: string;
  valor: number;
  data: string;
  status: string;
  forma_pagamento: string;
  usuario_id: number;
}

export default function ViewRegistroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [registro, setRegistro] = useState<Registro | null>(null);

  useEffect(() => {
    // Simulação de busca de dados. Substitua por uma chamada real à API.
    if (id) {
      const registroSimulado: Registro = {
        id: parseInt(id as string, 10),
        descricao: "Compra de materiais",
        tipo: "Despesa",
        valor: 150.0,
        data: "2024-04-10",
        status: "Pendente",
        forma_pagamento: "Cartão de Crédito",
        usuario_id: 101,
      };
      setRegistro(registroSimulado);
    }
  }, [id]);

  if (!registro) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Detalhes do Registro
        </h1>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {registro.id}
          </p>
          <p>
            <strong>Descrição:</strong> {registro.descricao}
          </p>
          <p>
            <strong>Tipo:</strong> {registro.tipo}
          </p>
          <p>
            <strong>Valor:</strong> R$ {registro.valor.toFixed(2)}
          </p>
          <p>
            <strong>Data:</strong> {registro.data}
          </p>
          <p>
            <strong>Status:</strong> {registro.status}
          </p>
          <p>
            <strong>Forma de Pagamento:</strong> {registro.forma_pagamento}
          </p>
          <p>
            <strong>Usuário ID:</strong> {registro.usuario_id}
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    </div>
  );
}
