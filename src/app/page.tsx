"use client";

import { useState } from "react";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import PaymentModal from "@/components/PaymentModal";

import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentOpen, setPaymentOpen] = useState(false);

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
function handleCash() {
  alert("รับชำระเงินสด");
  clearCart();
  setPaymentOpen(false);
}

function handleTransfer() {
  alert("รับชำระเงินโอน");
  clearCart();
  setPaymentOpen(false);
}

function handleThaiHelpThai() {
  alert("รับชำระไทยช่วยไทย");
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
  open={paymentOpen}
  onClose={() => setPaymentOpen(false)}
  onCash={handleCash}
  onTransfer={handleTransfer}
  onThaiHelpThai={handleThaiHelpThai}
/>

      </div>

    </main>
  );
}