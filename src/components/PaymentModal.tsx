type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PaymentModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[420px] rounded-3xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-center text-2xl font-bold">
          เลือกวิธีชำระเงิน
        </h2>

        <div className="space-y-3">

          <button className="w-full rounded-2xl bg-green-500 py-4 text-xl font-bold text-white">
            💵 เงินสด
          </button>

          <button className="w-full rounded-2xl bg-sky-500 py-4 text-xl font-bold text-white">
            📱 เงินโอน
          </button>

          <button className="w-full rounded-2xl bg-orange-400 py-4 text-xl font-bold text-white">
            🇹🇭 ไทยช่วยไทย
          </button>

          <button
            onClick={onClose}
            className="mt-4 w-full rounded-2xl border py-4 font-semibold"
          >
            ยกเลิก
          </button>

        </div>

      </div>

    </div>
  );
}