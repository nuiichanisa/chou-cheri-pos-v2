"use client";

import type { Sale } from "@/types/sale";

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
      <h2 className="mb-4 text-xl font-bold">
        ประวัติการขาย
      </h2>

      {sorted.length === 0 ? (
        <p className="text-gray-400">
          ยังไม่มีรายการ
        </p>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {sorted.map((sale) => (
            <div
              key={sale.id}
              className="rounded-xl border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">

                <div>
                  <div className="font-bold text-lg">
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