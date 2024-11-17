"use client";

//* Importa os hooks de roteamento e de busca de parâmetros da URL
import { useRouter, useParams } from "next/navigation";

//* Importa os hooks de busca de registro por ID
import { useGetContaById } from "../../../../../hooks/contas/useContas";

//* Importa os componentes de UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

//* Importa os ícones
import {
  ArrowLeft,
  AlertCircle,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Tag,
  BadgeCheck,
} from "lucide-react";

//* Importa a função de formatação de data
import { formatDateForDisplay } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function ViewRegistroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { conta: registro, loading, error } = useGetContaById(id);

  // Carregando state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar registro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Not found state
  if (!registro) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registro não encontrado</AlertTitle>
          <AlertDescription>
            O registro que você está procurando não existe ou foi removido.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          <CardTitle>Detalhes do Registro</CardTitle>
          <CardDescription>
            Informações completas do registro financeiro
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Descrição</p>
                <p className="text-base">{registro.descricao}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Tag className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Tipo</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    registro.tipo === "receita"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {registro.tipo.charAt(0).toUpperCase() +
                    registro.tipo.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Valor</p>
                <p
                  className={`text-base ${
                    registro.tipo === "receita"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(registro.valor)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Data</p>
                <p className="text-base">
                  {formatDateForDisplay(registro.data)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <BadgeCheck className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    registro.status === "concluído"
                      ? "bg-green-100 text-green-800"
                      : registro.status === "pendente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {registro.status.charAt(0).toUpperCase() +
                    registro.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  Forma de Pagamento
                </p>
                <p className="text-base capitalize">
                  {registro.forma_pagamento.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/conta/${id}/edit/`)}
              className="w-full sm:w-auto"
            >
              Editar Registro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
