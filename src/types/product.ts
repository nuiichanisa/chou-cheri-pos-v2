export type ProductCategory =
  | "bread"
  | "bakery"
  | "jam"
  | "drink"
  | "food";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
}