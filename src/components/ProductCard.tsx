import type { Product } from "@/types/product";

type Props = {
  product: Product;
  onProductClick: (product: Product) => void;
};

export default function ProductCard({
  product,
  onProductClick,
}: Props) {
  const handleClick = () => {
    onProductClick(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleClick();
      }}
      style={{
        width: "100%",
        border: "none",
        background: "white",
        borderRadius: "20px",
        padding: "16px",
        cursor: "pointer",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        draggable={false}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: "16px",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      />

      <h3>{product.name}</h3>

      <p>฿{product.price}</p>
    </button>
  );
}