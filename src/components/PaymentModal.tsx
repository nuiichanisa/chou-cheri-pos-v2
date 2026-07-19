"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  total: number;
  onClose: () => void;
  onCash: (received: number) => void;
  onTransfer: () => void;
  onThaiHelpThai: () => void;
};

export default function PaymentModal({
  open,
  total,
  onClose,
  onCash,
  onTransfer,
  onThaiHelpThai,
}: Props) {
  const [received, setReceived] = useState("");

  const [confirmType, setConfirmType] = useState<
   "cash" | "transfer" | "thai-help-thai" | null
>(null);
const [processing, setProcessing] = useState(false);


  useEffect(() => {
  if (open) {
    setReceived("");
    setConfirmType(null);
  }
}, [open]);

  if (!open) return null;

  const receiveAmount = Number(received) || 0;
  const change = Math.max(receiveAmount - total, 0);

  const quickCash = [100, 200, 500, 1000];

  function confirmPayment() {
  if (processing) return;

  setProcessing(true);

  switch (confirmType) {
    case "cash":
      onCash(receiveAmount);
      break;

    case "transfer":
      onTransfer();
      break;

    case "thai-help-thai":
      onThaiHelpThai();
      break;
  }

  setConfirmType(null);

  setTimeout(() => {
    setProcessing(false);
  }, 800);
}

  return (
  <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-3xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-center text-2xl font-bold">
          ชำระเงิน
        </h2>

        <div className="mb-4 rounded-xl bg-gray-100 p-4 text-center">
          <div className="text-sm text-gray-500">ยอดรวม</div>
          <div className="text-4xl font-bold text-teal-600">
            ฿{total}
          </div>
        </div>

        <input
          type="number"
          placeholder="รับเงิน"
          value={received}
          onChange={(e) => setReceived(e.target.value)}
          className="mb-3 w-full rounded-xl border p-3 text-center text-2xl font-bold"
        />

        <div className="mb-4 grid grid-cols-5 gap-2">
          <button
  onClick={() => setReceived(String(total))}
  className="rounded-xl bg-teal-500 py-3 font-bold text-white"
>
  พอดี
</button>
          {quickCash.map((amount) => (
            <button
              key={amount}
              onClick={() => setReceived(String(amount))}
              className="rounded-xl bg-gray-200 py-3 font-bold transition hover:bg-gray-300"
            >
              ฿{amount}
            </button>
          ))}
        </div>

        <div className="mb-5 rounded-xl bg-green-100 p-4 text-center">
          <div className="text-sm text-gray-600">
            เงินทอน
          </div>

          <div className="text-4xl font-bold text-green-700">
            ฿{change}
          </div>
        </div>

        <button
          onClick={() => setConfirmType("cash")}
          disabled={receiveAmount < total}
          className="mb-3 w-full rounded-xl bg-green-500 py-4 text-xl font-bold text-white disabled:bg-gray-300"
        >
          💵 เงินสด
        </button>

        <button
          onClick={() => setConfirmType("transfer")}
          className="mb-3 w-full rounded-xl bg-sky-500 py-4 text-xl font-bold text-white"
        >
          📱 เงินโอน
        </button>

        <button
          onClick={() => setConfirmType("thai-help-thai")}
          className="mb-3 w-full rounded-xl bg-orange-400 py-4 text-xl font-bold text-white"
        >
          🇹🇭 ไทยช่วยไทย
        </button>

        <button
          onClick={onClose}
          className="w-full rounded-xl border py-4 font-semibold"
        >
          ยกเลิก
        </button>

            </div>
         </div>

      {confirmType && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="w-[360px] rounded-3xl bg-white p-6 shadow-2xl">

            <h3 className="mb-4 text-center text-2xl font-bold">
              ยืนยันการชำระเงิน
            </h3>

            <div className="mb-5 rounded-xl bg-gray-100 p-4 space-y-2">

              <div>
                ยอดชำระ <b>฿{total}</b>
              </div>

              {confirmType === "cash" && (
                <>
                  <div>
                    รับเงิน <b>฿{receiveAmount}</b>
                  </div>

                  <div>
                    เงินทอน <b>฿{change}</b>
                  </div>
                </>
              )}

              {confirmType === "transfer" && (
                <div>
                  วิธีชำระ <b>เงินโอน</b>
                </div>
              )}

              {confirmType === "thai-help-thai" && (
                <div>
                  วิธีชำระ <b>ไทยช่วยไทย</b>
                </div>
              )}

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => setConfirmType(null)}
                className="flex-1 rounded-xl border py-3 font-bold"
              >
                ยกเลิก
              </button>

              <button
  onClick={confirmPayment}
  disabled={processing}
  className="flex-1 rounded-xl bg-teal-500 py-3 font-bold text-white disabled:bg-gray-300"
>
  {processing ? "กำลังบันทึก..." : "✅ ยืนยัน"}
</button>

            </div>

          </div>
        </div>
      )}

    </>
  );
}