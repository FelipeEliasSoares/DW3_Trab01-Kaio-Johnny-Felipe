"use client";

//* Importa os hooks de roteamento e de busca de parâmetros da URL
import { useRouter, useParams } from "next/navigation";

//* Importa os hooks de busca de registro por ID
import { useState, useEffect } from "react";

//* Importa os hooks de busca de registro por ID e de atualização de registro
import {
  useGetContaById,
  useUpdateConta,
} from "../../../../../hooks/contas/useContas";

//* Importa os tipos
import { UpdateContaInput } from "../../../../../hooks/contas/types/types";

//* Importa os componentes de UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

//* Importa os ícones
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

//* Função auxiliar para formatar a data
const formatDateForInput = (isoDate: string) => {
  if (!isoDate) return "";
  return isoDate.split("T")[0];
};

export default function EditRegistroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    conta,
    loading: loadingConta,
    error: loadError,
  } = useGetContaById(id);

  const {
    updateConta,
    loading: updating,
    error: updateError,
  } = useUpdateConta();

  const [formData, setFormData] = useState<UpdateContaInput>({
    descricao: "",
    tipo: "despesa",
    valor: 0,
    data: "",
    status: "pendente",
    forma_pagamento: "dinheiro",
  });

  // Update form data when conta is loaded, com formatação da data
  useEffect(() => {
    if (conta) {
      setFormData({
        descricao: conta.descricao,
        tipo: conta.tipo,
        valor: conta.valor,
        data: formatDateForInput(conta.data),
        status: conta.status,
        forma_pagamento: conta.forma_pagamento,
      });
    }
  }, [conta]);

  const handleSave = async () => {
    try {
      const dataToSend = {
        ...formData,
        data: formData.data + "T00:00:00.000Z",
      };
      await updateConta(id, dataToSend);
      router.push("/dashboard/conta");
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

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
          <CardTitle>Editar Registro</CardTitle>
          <CardDescription>Atualize as informações do registro</CardDescription>
        </CardHeader>

        <CardContent>
          {updateError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{updateError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="descricao">Descrição</label>
              <Input
                id="descricao"
                placeholder="Descrição do registro"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="tipo">Tipo</label>
              <Select
                value={formData.tipo}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    tipo: value as "receita" | "despesa",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="valor">Valor</label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    valor: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="data">Data</label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "pendente" | "concluído" | "cancelado",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="concluído">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="forma_pagamento">Forma de Pagamento</label>
              <Select
                value={formData.forma_pagamento}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    forma_pagamento: value as
                      | "dinheiro"
                      | "cartao"
                      | "transferencia",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={updating}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={updating}
              className="flex items-center gap-2"
            >
              {updating ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
