export type ProductCategory = "bread" | "bakery" | "jam" | "drink";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
}