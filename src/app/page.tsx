"use client";

import { useState } from "react";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log(cart);

  function addToCart(product: Product) {
  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      return currentCart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...currentCart,
      {
        product,
        quantity: 1,
      },
    ];
  });
}

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[3fr_1fr]">
        <ProductGrid onProductClick={addToCart} />

        <aside className="rounded-3xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold">
            Cart
          </h2>

          {cart.length === 0 ? (
  <p className="mt-4 text-gray-400">
    ยังไม่มีสินค้า
  </p>
) : (
  <div className="mt-4">
    {cart.map((item) => (
      <div
        key={item.product.id}
        className="mb-3 rounded-xl border p-3"
      >
        <p className="font-semibold">
          {item.product.name}
        </p>

        <p>
          จำนวน {item.quantity}
        </p>

        <p>
          ฿{item.product.price * item.quantity}
        </p>
      </div>
    ))}
  </div>
)}
        </aside>
      </div>
    </main>
  );
}