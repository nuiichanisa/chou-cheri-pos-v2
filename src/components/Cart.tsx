import type { CartItem } from "@/types/cart";

type Props = {
  cart: CartItem[];
  total: number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  openPayment: () => void;
};

export default function Cart({
  cart,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  openPayment,
}: Props) {
  return (
    <aside className="rounded-3xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold">Cart</h2>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-400">ยังไม่มีสินค้า</p>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="rounded-xl border p-3"
              >
                <p className="font-semibold">
                  {item.product.name}
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product.id)
                    }
                    className="h-8 w-8 rounded-full bg-pink-200"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.product.id)
                    }
                    className="h-8 w-8 rounded-full bg-green-200"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 font-bold text-teal-600">
                  ฿{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeItem(item.product.id)
                  }
                  className="mt-2 text-sm text-red-500"
                >
                  🗑 ลบ
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>รวม</span>
              <span>฿{total}</span>
            </div>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-xl bg-red-100 py-3 font-semibold"
            >
              ล้างตะกร้า
            </button>

            <button
              onClick={openPayment}
              className="mt-3 w-full rounded-xl bg-teal-500 py-3 font-bold text-white"
            >
              ชำระเงิน
            </button>
          </div>
        </>
      )}
    </aside>
  );
}