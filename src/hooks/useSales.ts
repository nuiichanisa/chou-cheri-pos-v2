import { useEffect, useState } from "react";
import { getSales, saveSale } from "@/lib/db";
import type { Sale } from "@/types/sale";

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);

  async function loadSales() {
    const data = await getSales();
    setSales(data);
  }

  async function addSale(sale: Sale) {
    await saveSale(sale);
    await loadSales();
  }

  useEffect(() => {
    loadSales();
  }, []);

  return {
    sales,
    addSale,
    reload: loadSales,
  };
}