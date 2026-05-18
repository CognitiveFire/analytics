"use client";

import { create } from "zustand";

interface PlatformState {
  clientId: string;
  period: string;
  comparePrevious: boolean;
  setClientId: (clientId: string) => void;
  setPeriod: (period: string) => void;
  toggleComparePrevious: () => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  clientId: "sotra-ror",
  period: "Last 30 days",
  comparePrevious: true,
  setClientId: (clientId) => set({ clientId }),
  setPeriod: (period) => set({ period }),
  toggleComparePrevious: () => set((state) => ({ comparePrevious: !state.comparePrevious })),
}));
