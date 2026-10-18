import { useCallback, useEffect, useMemo, useState } from "react";
import type { PurchaseEvent, RecurrenceInterval } from "../data/purchaseHistoryTypes";
import {
  createPurchaseEventId,
  readPurchaseEvents,
  writePurchaseEvents,
} from "../data/purchaseHistoryStorage";
import {
  buildMyElsewhereDashboard,
  rollupProductPurchases,
  summarizePurchaseHistory,
} from "../data/loggedImpact";

export type NewPurchaseInput = {
  productId: string;
  quantity: number;
  purchaseDate: string;
  recurring: boolean;
  recurrenceInterval?: RecurrenceInterval;
};

export function usePurchaseHistory() {
  const [events, setEvents] = useState<PurchaseEvent[]>(() =>
    readPurchaseEvents(),
  );

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "elsewhere.purchaseHistory.v1") {
        setEvents(readPurchaseEvents());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: PurchaseEvent[]) => {
    writePurchaseEvents(next);
    setEvents(next);
  }, []);

  const addPurchase = useCallback(
    (input: NewPurchaseInput) => {
      const quantity = Math.max(1, Math.floor(input.quantity));
      const event: PurchaseEvent = {
        id: createPurchaseEventId(),
        productId: input.productId,
        quantity,
        purchaseDate: input.purchaseDate,
        createdAt: new Date().toISOString(),
        recurring: input.recurring,
        recurrenceInterval: input.recurring
          ? input.recurrenceInterval
          : undefined,
      };
      persist([...events, event]);
      return event;
    },
    [events, persist],
  );

  const updatePurchase = useCallback(
    (
      eventId: string,
      patch: Partial<Pick<PurchaseEvent, "quantity" | "purchaseDate">>,
    ) => {
      persist(
        events.map((e) => {
          if (e.id !== eventId) return e;
          const quantity =
            patch.quantity != null
              ? Math.max(1, Math.floor(patch.quantity))
              : e.quantity;
          return {
            ...e,
            ...patch,
            quantity,
          };
        }),
      );
    },
    [events, persist],
  );

  const deletePurchase = useCallback(
    (eventId: string) => {
      persist(events.filter((e) => e.id !== eventId));
    },
    [events, persist],
  );

  const removeProductHistory = useCallback(
    (productId: string) => {
      persist(events.filter((e) => e.productId !== productId));
    },
    [events, persist],
  );

  const hasPurchases = useCallback(
    (productId: string) => events.some((e) => e.productId === productId),
    [events],
  );

  const eventsForProduct = useCallback(
    (productId: string) =>
      events
        .filter((e) => e.productId === productId)
        .sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate)),
    [events],
  );

  const productRollups = useMemo(() => {
    const ids = [...new Set(events.map((e) => e.productId))];
    return ids
      .map((id) => rollupProductPurchases(id, events))
      .filter((r): r is NonNullable<typeof r> => r != null)
      .sort((a, b) =>
        (b.lastPurchaseDate ?? "").localeCompare(a.lastPurchaseDate ?? ""),
      );
  }, [events]);

  const summary = useMemo(() => summarizePurchaseHistory(events), [events]);

  const dashboard = useMemo(
    () => buildMyElsewhereDashboard(events),
    [events],
  );

  const lastRecurrenceForProduct = useCallback(
    (productId: string): Pick<PurchaseEvent, "recurring" | "recurrenceInterval"> | null => {
      const latest = eventsForProduct(productId).find((e) => e.recurring);
      if (!latest) return null;
      return {
        recurring: latest.recurring,
        recurrenceInterval: latest.recurrenceInterval,
      };
    },
    [eventsForProduct],
  );

  return {
    events,
    summary,
    productRollups,
    addPurchase,
    updatePurchase,
    deletePurchase,
    removeProductHistory,
    dashboard,
    hasPurchases,
    eventsForProduct,
    lastRecurrenceForProduct,
  };
}
