import { useState, useEffect } from "react";

import { Link, useParams } from "react-router";
import { toast } from "sonner";

import { API_URL } from "../../services/api";
import { getRefundById } from "../../services/refund";
import { getReceiptDownloadUrl } from "../../services/receipt";

import { formatCurrency } from "../../utils/formatCurrency";

import { refundCategories } from "../../constants/refundCategories";

import type { RefundDetails as RefundDetailsType } from "../../types/refund";

import { Container } from "../../components/layout";
import { Button, Icon, Input, Select, Text } from "../../components/ui";
import DeleteRefundDialog from "./components/DeleteRefundDialog";

import { File } from "../../assets/icons";

export default function RefundDetails() {
  const { id } = useParams();

  const [refund, setRefund] = useState<RefundDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Faz a requisição
  useEffect(() => {
    async function loadRefund() {
      if (!id) {
        setError("Solicitação inválida.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await getRefundById(id);

        setRefund(response);
      } catch {
        setError("Não foi possível carregar a solicitação.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRefund();
  }, [id]);

  if (isLoading) {
    return (
      <Container className="max-w-6xl">
        <Text size="lg" weight="semiBold" className="text-center">
          Carregando solicitações...
        </Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="max-w-lg gap-8">
        <Text size="lg" weight="bold" className="text-center uppercase">
          Solicitação não encontrada.
        </Text>

        <Button as={Link} to="/">
          Voltar para a lista
        </Button>
      </Container>
    );
  }

  if (!refund) {
    return null;
  }

  async function handleOpenReceipt(receiptId: string) {
    try {
      const receiptUrl = await getReceiptDownloadUrl(receiptId);

      window.open(`${API_URL}${receiptUrl}`, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Não foi possível abrir o comprovante.");
    }
  }

  return (
    <Container className="max-w-lg gap-10">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <Text as={"h2"} size="lg" weight="bold">
          Solicitação de reembolso
        </Text>

        <Text textColor="secondary">
          Dados da despesa para solicitar reembolso.{" "}
        </Text>
      </header>

      {/* Refund details */}
      <div className="flex flex-col gap-8">
        <Input label="Nome da Solicitação" value={refund.title} readOnly />

        <div className="flex gap-4">
          <div className="flex-1">
            <Select label="Categoria" value={refund.category} disabled>
              {/* Object entries gera um array de pares [chave, valor] */}
              {Object.entries(refundCategories).map(([value, category]) => (
                <option key={value} value={value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </div>

          <Input
            label="Valor"
            value={formatCurrency(refund.value)}
            className="w-38"
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            onClick={() => handleOpenReceipt(refund.receipt.id)}
          >
            <Icon svg={File} className="group-hover:fill-green-light" />
            Abrir comprovante
          </Button>

          <DeleteRefundDialog refundId={refund.id} />
        </div>
      </div>
    </Container>
  );
}
