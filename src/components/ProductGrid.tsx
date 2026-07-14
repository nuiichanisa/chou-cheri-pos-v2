import { products } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type Props = {
  onProductClick: (product: Product) => void;
};

export default function ProductGrid({
  onProductClick,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}