import type { RefundCategory } from "../constants/refundCategories";

// Tipos de dados relacionados a solicitações de reembolso
export interface Refund {
  id: string;
  title: string;
  category: RefundCategory;
  value: number;
}

// Tipos de dados relacionados às respostas da API
export interface RefundMeta {
  currentPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string | null;
  perPage: number;
  previousPageUrl: string | null;
  total: number;
}

// Tipos de dados relacionados à resposta da API para todas as solicitações de reembolso
export interface RefundsResponse {
  refunds: {
    data: Refund[];
    meta: RefundMeta;
  };
}

// Tipos de dados relacionados a solicitações de recibo
export interface Receipt {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
}

// Tipos de dados relacionados a detalhes de solicitação de reembolso
export interface RefundDetails extends Refund {
  receipt: Receipt;
}

// Tipos de dados relacionados à resposta da API para uma solicitação de reembolso específica
export interface RefundResponse {
  refund: RefundDetails;
}

// Tipos de dados relacionados à resposta da API para exclusão de solicitação de reembolso
export interface DeleteRefundResponse {
  message: string;
}

export interface CreateRefundData {
  title: string;
  category: RefundCategory;
  value: number;
  receipt: string;
}

export interface CreateRefundResponse {
  refund: Refund;
}