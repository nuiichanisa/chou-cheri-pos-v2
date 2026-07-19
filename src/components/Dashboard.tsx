"use client";

import type { Sale } from "@/types/sale";

type Props = {
  sales: Sale[];
};

export default function Dashboard({ sales }: Props) {
  const today = new Date().toDateString();

  const todaySales = sales.filter(
    (sale) =>
      new Date(sale.createdAt).toDateString() === today
  );

  const revenue = todaySales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const cash = todaySales
    .filter((sale) => sale.payment === "cash")
    .reduce((sum, sale) => sum + sale.total, 0);

  const transfer = todaySales
    .filter((sale) => sale.payment === "transfer")
    .reduce((sum, sale) => sum + sale.total, 0);

  const thai = todaySales
    .filter((sale) => sale.payment === "thai-help-thai")
    .reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">

      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="text-gray-500">
          ยอดขายวันนี้
        </div>

        <div className="mt-2 text-3xl font-bold text-teal-600">
          ฿{revenue}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="text-gray-500">
          ออเดอร์
        </div>

        <div className="mt-2 text-3xl font-bold">
          {todaySales.length}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="text-gray-500">
          เงินสด
        </div>

        <div className="mt-2 text-3xl font-bold">
          ฿{cash}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="text-gray-500">
          โอน / ไทยช่วยไทย
        </div>

        <div className="mt-2 text-3xl font-bold">
          ฿{transfer + thai}
        </div>
      </div>

    </div>
  );
}