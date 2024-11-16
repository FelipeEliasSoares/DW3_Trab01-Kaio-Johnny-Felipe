"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash, Eye, Edit, Search } from "lucide-react";

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

export default function ContaPage() {
  const [registros, setRegistros] = useState<Registro[]>([
    {
      id: 1,
      descricao: "Compra de materiais",
      tipo: "Despesa",
      valor: 150.0,
      data: "2024-04-10",
      status: "Pendente",
      forma_pagamento: "Cartão de Crédito",
      usuario_id: 101,
    },
    {
      id: 2,
      descricao: "Venda de produto",
      tipo: "Receita",
      valor: 500.0,
      data: "2024-04-12",
      status: "Concluído",
      forma_pagamento: "Boleto",
      usuario_id: 102,
    },
    // Adicione mais registros simulados conforme necessário
  ]);

  const [novoRegistro, setNovoRegistro] = useState<Partial<Registro>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const adicionarRegistro = () => {
    const novoId =
      registros.length > 0 ? registros[registros.length - 1].id + 1 : 1;
    setRegistros([
      ...registros,
      {
        id: novoId,
        descricao: novoRegistro.descricao || "",
        tipo: novoRegistro.tipo || "",
        valor: novoRegistro.valor || 0,
        data: novoRegistro.data || "",
        status: novoRegistro.status || "",
        forma_pagamento: novoRegistro.forma_pagamento || "",
        usuario_id: novoRegistro.usuario_id || 0,
      },
    ]);
    setIsDialogOpen(false);
    setNovoRegistro({});
  };

  const deletarRegistro = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este registro?")) {
      setRegistros(registros.filter((registro) => registro.id !== id));
    }
  };

  const registrosFiltrados = useMemo(() => {
    return registros.filter((registro) =>
      registro.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [registros, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Gestão de Contas
        </h1>

        {/* Barra de Pesquisa */}
        <div className="flex items-center mb-4">
          <Input
            placeholder="Pesquisar por descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button>
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Botão para Adicionar Novo Registro */}
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Registro
          </Button>
        </div>

        {/* Tabela de Registros */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Forma de Pagamento</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrosFiltrados.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.id}</TableCell>
                <TableCell>{registro.descricao}</TableCell>
                <TableCell>{registro.tipo}</TableCell>
                <TableCell>R$ {registro.valor.toFixed(2)}</TableCell>
                <TableCell>{registro.data}</TableCell>
                <TableCell>{registro.status}</TableCell>
                <TableCell>{registro.forma_pagamento}</TableCell>
                <TableCell className="flex space-x-2">
                  {/* Botão de Visualizar */}
                  <Link href={`/dashboard/conta/${registro.id}/view`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Botão de Editar */}
                  <Link href={`/dashboard/conta/${registro.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Botão de Deletar */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletarRegistro(registro.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog para Adicionar Novo Registro */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Registro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Descrição"
                value={novoRegistro.descricao || ""}
                onChange={(e) =>
                  setNovoRegistro({
                    ...novoRegistro,
                    descricao: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Tipo"
                value={novoRegistro.tipo || ""}
                onChange={(e) =>
                  setNovoRegistro({ ...novoRegistro, tipo: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Valor"
                value={novoRegistro.valor || ""}
                onChange={(e) =>
                  setNovoRegistro({
                    ...novoRegistro,
                    valor: parseFloat(e.target.value),
                  })
                }
              />
              <Input
                type="date"
                placeholder="Data"
                value={novoRegistro.data || ""}
                onChange={(e) =>
                  setNovoRegistro({ ...novoRegistro, data: e.target.value })
                }
              />
              <Input
                placeholder="Status"
                value={novoRegistro.status || ""}
                onChange={(e) =>
                  setNovoRegistro({ ...novoRegistro, status: e.target.value })
                }
              />
              <Input
                placeholder="Forma de Pagamento"
                value={novoRegistro.forma_pagamento || ""}
                onChange={(e) =>
                  setNovoRegistro({
                    ...novoRegistro,
                    forma_pagamento: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Usuário ID"
                value={novoRegistro.usuario_id || ""}
                onChange={(e) =>
                  setNovoRegistro({
                    ...novoRegistro,
                    usuario_id: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button onClick={adicionarRegistro}>Adicionar</Button>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
