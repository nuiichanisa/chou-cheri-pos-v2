"use client";

import { useState } from "react";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import PaymentModal from "@/components/PaymentModal";
import Dashboard from "@/components/Dashboard";

import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";
import { useSales } from "@/hooks/useSales";
import type { PaymentMethod } from "@/types/sale";
import SalesHistory from "@/components/SalesHistory";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { sales, addSale } = useSales();

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

  function increaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(productId: number) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  }
  function clearCart() {
  setCart([]);
}
async function completeSale(payment: PaymentMethod) {
  await addSale({
    createdAt: new Date().toISOString(),
    payment,
    subtotal: total,
    discount: 0,
    total,
    items: cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
  });

  clearCart();
  setPaymentOpen(false);
}

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

<div className="mx-auto max-w-7xl px-6 pt-6">
  <Dashboard sales={sales} />
</div>

      <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[3fr_1fr]">

        <ProductGrid onProductClick={addToCart} />

<Cart
  cart={cart}
  total={total}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
  removeItem={removeItem}
  clearCart={clearCart}
  openPayment={() => setPaymentOpen(true)}
/>

<PaymentModal
  total={total}
  open={paymentOpen}
  onClose={() => setPaymentOpen(false)}
  onCash={(received) => {
  if (received < total) {
    alert("เงินไม่พอ");
    return;
  }

  completeSale("cash");
}}
  onTransfer={() => completeSale("transfer")}
  onThaiHelpThai={() => completeSale("thai-help-thai")}
/>
<div className="mt-6">
  <SalesHistory sales={sales} />
</div>

      </div>

    </main>
  );
}