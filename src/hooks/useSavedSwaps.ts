import { useCallback, useEffect, useMemo, useState } from "react";
import {
  readSavedSwapIds,
  resolveSavedProducts,
  writeSavedSwapIds,
} from "../data/savedSwaps";

export function useSavedSwaps() {
  const [savedIds, setSavedIds] = useState<string[]>(() => readSavedSwapIds());

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "elsewhere.savedSwaps.v1") {
        setSavedIds(readSavedSwapIds());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    writeSavedSwapIds(next);
    setSavedIds(next);
  }, []);

  const isSaved = useCallback(
    (productId: string) => savedIds.includes(productId),
    [savedIds],
  );

  const saveProduct = useCallback(
    (productId: string) => {
      if (savedIds.includes(productId)) return;
      persist([...savedIds, productId]);
    },
    [persist, savedIds],
  );

  const removeProduct = useCallback(
    (productId: string) => {
      persist(savedIds.filter((id) => id !== productId));
    },
    [persist, savedIds],
  );

  const toggleSaved = useCallback(
    (productId: string) => {
      if (savedIds.includes(productId)) {
        removeProduct(productId);
      } else {
        saveProduct(productId);
      }
    },
    [removeProduct, saveProduct, savedIds],
  );

  const savedProducts = useMemo(
    () => resolveSavedProducts(savedIds),
    [savedIds],
  );

  return {
    savedIds,
    savedProducts,
    isSaved,
    saveProduct,
    removeProduct,
    toggleSaved,
  };
}
