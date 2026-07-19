import { openDB } from "idb";
import type { Sale } from "../types/sale";

let dbPromise: ReturnType<typeof openDB> | null = null;

function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB("chou-cheri-pos", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("sales")) {
          db.createObjectStore("sales", {
            keyPath: "id",
            autoIncrement: true,
          });
        }

        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
      },
    });
  }

  return dbPromise;
}

export async function saveSale(sale: Sale) {
  const db = await getDB();
  await db.add("sales", sale);
}

export async function getSales(): Promise<Sale[]> {
  const db = await getDB();
  return db.getAll("sales");
}

export async function clearSales() {
  const db = await getDB();
  await db.clear("sales");
}