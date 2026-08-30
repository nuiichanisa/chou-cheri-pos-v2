import type { CartItem } from "@/types/cart";

type Props = {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;

  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  openPayment: () => void;
};

export default function Cart({
  cart,
  subtotal,
  discount,
  total,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  openPayment,
}: Props) {
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <aside className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">
            🛒 Cart
          </h2>

          <p className="text-sm text-slate-500">
            {totalItems} ชิ้น
          </p>
        </div>

        <div className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
          {cart.length} รายการ
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-400">ยังไม่มีสินค้า</p>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-800">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-teal-600">
                      ฿{item.product.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    🗑️
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.product.id)}
                    className="h-9 w-9 rounded-lg bg-pink-200 text-lg font-bold transition hover:bg-pink-300"
                  >
                    −
                  </button>

                  <span className="w-8 text-center text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.product.id)}
                    className="h-9 w-9 rounded-lg bg-green-200 text-lg font-bold transition hover:bg-green-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ยอดรวม</span>
                <span>฿{subtotal}</span>
              </div>

              <div className="flex justify-between border-t pt-2 text-2xl font-bold">
                <span>รวม</span>
                <span>฿{total}</span>
              </div>
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