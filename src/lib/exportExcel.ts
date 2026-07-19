import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Sale } from "@/types/sale";

export function exportSalesToExcel(sales: Sale[]) {
  const rows: Record<string, string | number>[] = [];

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      rows.push({
        วันที่: new Date(sale.createdAt).toLocaleDateString("th-TH"),
        เวลา: new Date(sale.createdAt).toLocaleTimeString("th-TH"),
        รายการ: item.name,
        จำนวน: item.quantity,
        ราคา: item.price,
        รวมสินค้า: item.price * item.quantity,
        ยอดรวมบิล: sale.total,
        วิธีชำระ:
          sale.payment === "cash"
            ? "เงินสด"
            : sale.payment === "transfer"
            ? "เงินโอน"
            : "ไทยช่วยไทย",
      });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const today = new Date().toISOString().slice(0, 10);

  saveAs(blob, `sales-${today}.xlsx`);
}