import { Bed, ForkKnife, PoliceCar, Receipt, Wrench } from "../assets/icons";

export const refundCategories = {
  food: {
    label: "Alimentação",
    icon: ForkKnife,
  },
  hosting: {
    label: "Hospedagem",
    icon: Bed,
  },
  other: {
    label: "Outros",
    icon: Receipt,
  },
  services: {
    label: "Serviços",
    icon: Wrench,
  },
  transport: {
    label: "Transporte",
    icon: PoliceCar,
  },
} as const;

export type RefundCategory = keyof typeof refundCategories;
