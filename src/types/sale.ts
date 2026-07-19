export type PaymentMethod =
  | "cash"
  | "transfer"
  | "thai-help-thai";

export type SaleItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export type Sale = {
  id?: number;

  createdAt: string;

  payment: PaymentMethod;

  subtotal: number;

  discount: number;

  total: number;

  items: SaleItem[];
};