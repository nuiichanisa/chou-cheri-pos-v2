"use client";

import type { Sale } from "@/types/sale";
import { exportSalesToExcel } from "@/lib/exportExcel";

type Props = {
  sales: Sale[];
};

function paymentLabel(payment: Sale["payment"]) {
  switch (payment) {
    case "cash":
      return "💵 เงินสด";
    case "transfer":
      return "📱 เงินโอน";
    case "thai-help-thai":
      return "🇹🇭 ไทยช่วยไทย";
    default:
      return payment;
  }
}

export default function SalesHistory({ sales }: Props) {
  const sorted = [...sales].reverse();

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">ประวัติการขาย</h2>

        <button
          type="button"
          onClick={() => exportSalesToExcel(sorted)}
          className="rounded-xl bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
        >
          📥 Export Excel
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-gray-400">ยังไม่มีรายการ</p>
      ) : (
        <div className="max-h-[500px] space-y-3 overflow-y-auto">
          {sorted.map((sale) => (
            <div
              key={sale.id}
              className="rounded-xl border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">
                    Order #{sale.id}
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(sale.createdAt).toLocaleString("th-TH")}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">
                    ฿{sale.total}
                  </div>

                  <div className="text-sm">
                    {paymentLabel(sale.payment)}
                  </div>
                </div>
              </div>

              <hr className="my-3" />

              <div className="space-y-1 text-sm">
                {sale.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ฿{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}