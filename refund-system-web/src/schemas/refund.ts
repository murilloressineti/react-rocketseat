import { z } from "zod";

export const refundSchema = z.object({
  title: z.string().min(1, "Informe o nome da solicitação"),

  category: z.enum(["food", "hosting", "other", "transport", "services"], "Informe a categoria"),

  value: z.string().min(1, "Informe o valor"),

  receipt: z.instanceof(File, { message: "Selecione um comprovante" }),
});

// Faz o TypeScript criar automaticamente o tipo do formulário a partir do schema.
export type RefundFormData = z.infer<typeof refundSchema>;
