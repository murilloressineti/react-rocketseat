import { api } from "./api";

import type {
  RefundsResponse,
  RefundResponse,
  DeleteRefundResponse,
  CreateRefundData,
  CreateRefundResponse,
} from "../types/refund";

// Busca todas as solicitações de reembolso
export async function getRefunds(q: string | undefined, page = 1) {
  const response = await api.get<RefundsResponse>("/refunds", {
    params: {
      q,
      page,
    },
  });

  return response.data.refunds;
}

// Busca uma solicitação de reembolso específica pelo ID
export async function getRefundById(id: string) {
  const response = await api.get<RefundResponse>(`/refunds/${id}`);

  return response.data.refund;
}

// Deleta uma solicitação de reembolso específica pelo ID
export async function deleteRefund(id: string) {
  const response = await api.delete<DeleteRefundResponse>(`/refunds/${id}`);

  return response.data;
}

// Cria uma solicitação de reembolso
export async function createRefund(data: CreateRefundData) {
  const response = await api.post<CreateRefundResponse>("/refunds", data);

  return response.data.refund;
}
