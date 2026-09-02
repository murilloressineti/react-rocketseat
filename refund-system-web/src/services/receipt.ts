import { api } from "./api";

interface ReceiptDownloadResponse {
  url: string;
}

interface CreateReceiptResponse {
  receipt: {
    id: string;
  };
}

export async function getReceiptDownloadUrl(id: string) {
  const response = await api.get<ReceiptDownloadResponse>(
    `/receipts/download/${id}`,
  );

  return response.data.url;
}

export async function createReceipt(file: File) {
  const formData = new FormData();

  formData.append("receiptFile", file);

  const response = await api.post<CreateReceiptResponse>("/receipts", formData);

  return response.data.receipt;
}
