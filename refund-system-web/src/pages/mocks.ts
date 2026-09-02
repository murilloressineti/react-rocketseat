import type { RefundCategory } from "../constants/refundCategories";

interface Refund {
  id: string;
  title: string;
  category: RefundCategory;
  value: number;
}

export const refunds: Refund[] = [
  {
    id: "1",
    title: "Rodrigo",
    category: "food",
    value: 34.78,
  },
  {
    id: "2",
    title: "Tamires",
    category: "hosting",
    value: 1200,
  },
  {
    id: "3",
    title: "Lara",
    category: "food",
    value: 12.35,
  },
  {
    id: "4",
    title: "Elias",
    category: "transport",
    value: 47.65,
  },
  {
    id: "5",
    title: "Thiago",
    category: "services",
    value: 99.9,
  },
  {
    id: "6",
    title: "Vinicius",
    category: "other",
    value: 25.89,
  },
];
