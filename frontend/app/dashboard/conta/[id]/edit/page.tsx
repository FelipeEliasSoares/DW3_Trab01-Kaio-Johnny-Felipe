"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function EditRegistroPage() {
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

  const salvarAlteracoes = () => {
    alert("Alterações salvas com sucesso!");
    router.push("/dashboard/conta");
  };

  if (!registro) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Registro</h1>
        <div className="space-y-4">
          <Input
            placeholder="Descrição"
            value={registro.descricao}
            onChange={(e) =>
              setRegistro({ ...registro, descricao: e.target.value })
            }
          />
          <Input
            placeholder="Tipo"
            value={registro.tipo}
            onChange={(e) => setRegistro({ ...registro, tipo: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Valor"
            value={registro.valor}
            onChange={(e) =>
              setRegistro({ ...registro, valor: parseFloat(e.target.value) })
            }
          />
          <Input
            type="date"
            placeholder="Data"
            value={registro.data}
            onChange={(e) => setRegistro({ ...registro, data: e.target.value })}
          />
          <Input
            placeholder="Status"
            value={registro.status}
            onChange={(e) =>
              setRegistro({ ...registro, status: e.target.value })
            }
          />
          <Input
            placeholder="Forma de Pagamento"
            value={registro.forma_pagamento}
            onChange={(e) =>
              setRegistro({
                ...registro,
                forma_pagamento: e.target.value,
              })
            }
          />
          <Input
            type="number"
            placeholder="Usuário ID"
            value={registro.usuario_id}
            onChange={(e) =>
              setRegistro({
                ...registro,
                usuario_id: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <div className="mt-4 flex justify-between">
          <Button onClick={() => router.back()}>Cancelar</Button>
          <Button onClick={salvarAlteracoes}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}
