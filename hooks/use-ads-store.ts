"use client";

import { create } from "zustand";

interface AdsState {
  accountId: string;
  selectedRecommendationId: string | null;
  manualReviewRequired: boolean;
  setAccountId: (accountId: string) => void;
  selectRecommendation: (recommendationId: string | null) => void;
}

export const useAdsStore = create<AdsState>((set) => ({
  accountId: "demo-executive",
  selectedRecommendationId: null,
  manualReviewRequired: true,
  setAccountId: (accountId) => set({ accountId }),
  selectRecommendation: (recommendationId) => set({ selectedRecommendationId: recommendationId }),
}));
