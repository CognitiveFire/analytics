"use client";

import { create } from "zustand";

import { formatMonthLabel, getPreviousMonthLabel } from "@/lib/reporting/month-periods";

interface PlatformState {
  clientId: string;
  period: string;
  comparePeriod: string;
  setClientId: (clientId: string) => void;
  setPeriod: (period: string) => void;
}

const initialPeriod = formatMonthLabel(new Date());

export const usePlatformStore = create<PlatformState>((set) => ({
  clientId: "demo-executive",
  period: initialPeriod,
  comparePeriod: getPreviousMonthLabel(initialPeriod),
  setClientId: (clientId) => set({ clientId }),
  setPeriod: (period) => set({ period, comparePeriod: getPreviousMonthLabel(period) }),
}));
