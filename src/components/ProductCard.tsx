import { useRef } from "react";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  onProductClick: (product: Product) => void;
};

export default function ProductCard({
  product,
  onProductClick,
}: Props) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const moved = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    moved.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    const deltaX = Math.abs(
      touch.clientX - touchStartX.current
    );

    const deltaY = Math.abs(
      touch.clientY - touchStartY.current
    );

    if (deltaX > 10 || deltaY > 10) {
      moved.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();

    if (!moved.current) {
      onProductClick(product);
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        // ป้องกัน click ซ้ำหลัง touch บน iPad
        if (e.detail === 0) return;

        onProductClick(product);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        border: "none",
        background: "white",
        borderRadius: "20px",
        padding: "16px",
        cursor: "pointer",
        touchAction: "pan-y",
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