"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import Link from "next/link";
import {
  useGetAllContas,
  useInsertConta,
  useDeleteConta,
} from "../../../hooks/contas/useContas";
import { Conta, CreateContaInput } from "../../../hooks/contas/types/types";
import { cn } from "@/lib/utils";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Trash, Eye, Edit, Search, Plus, AlertCircle } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function ContaPage() {
  const [isPending, startTransition] = useTransition();
  const { contas, loading, error, refetch } = useGetAllContas();
  const {
    insertConta,
    loading: inserting,
    error: insertError,
  } = useInsertConta();
  const {
    deleteConta,
    loading: deleting,
    error: deleteError,
  } = useDeleteConta();

  const [novoRegistro, setNovoRegistro] = useState<Partial<Conta>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized filtered and paginated records
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered = contas.filter((registro) =>
      registro.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [contas, searchQuery, currentPage]);

  // Optimized handlers
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(async () => {
    const requiredFields: Array<keyof CreateContaInput> = [
      "descricao",
      "tipo",
      "valor",
      "data",
      "status",
      "forma_pagamento",
    ];

    const missingField = requiredFields.find((field) => !novoRegistro[field]);
    if (missingField) {
      alert(`Campo ${missingField} é obrigatório.`);
      return;
    }

    try {
      await insertConta(novoRegistro as CreateContaInput);
      setIsDialogOpen(false);
      setNovoRegistro({});
      startTransition(() => {
        refetch();
      });
    } catch (error) {
      console.error("Erro ao inserir conta:", error);
    }
  }, [novoRegistro, insertConta, refetch]);

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar este registro?")) {
        try {
          await deleteConta(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar conta:", error);
        }
      }
    },
    [deleteConta, refetch]
  );

  // Status badge renderer
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-800",
      concluído: "bg-green-100 text-green-800",
      cancelado: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={cn(colors[status as keyof typeof colors])}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Gestão de Contas</CardTitle>
          <CardDescription>
            Gerencie suas contas a receber e a pagar
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search and Add Section */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Pesquisar por descrição..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Registro
            </Button>
          </div>

          {/* Error Alerts */}
          {(error || insertError || deleteError) && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || insertError || deleteError}
              </AlertDescription>
            </Alert>
          )}

          {/* Table Section */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRecords.map((registro) => (
                      <TableRow key={registro.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {registro.descricao}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              registro.tipo === "receita"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {registro.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={cn(
                            "font-medium",
                            registro.tipo === "receita"
                              ? "text-green-600"
                              : "text-red-600"
                          )}
                        >
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(registro.valor)}
                        </TableCell>
                        <TableCell>
                          {new Date(registro.data).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={registro.status} />
                        </TableCell>
                        <TableCell className="capitalize">
                          {registro.forma_pagamento}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                href={`/dashboard/conta/${registro.id}/view`}
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                href={`/dashboard/conta/${registro.id}/edit`}
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletarRegistro(registro.id)}
                              disabled={deleting}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add New Record Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Registro</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Descrição"
              value={novoRegistro.descricao || ""}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, descricao: e.target.value })
              }
            />
            <Select
              value={novoRegistro.tipo}
              onValueChange={(value) =>
                setNovoRegistro({ ...novoRegistro, tipo: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
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
              value={novoRegistro.data || ""}
              onChange={(e) =>
                setNovoRegistro({ ...novoRegistro, data: e.target.value })
              }
            />
            <Select
              value={novoRegistro.status}
              onValueChange={(value) =>
                setNovoRegistro({ ...novoRegistro, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="concluído">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={novoRegistro.forma_pagamento}
              onValueChange={(value) =>
                setNovoRegistro({ ...novoRegistro, forma_pagamento: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Forma de Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancelar
            </Button>
            <Button onClick={adicionarRegistro} disabled={inserting}>
              {inserting ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
