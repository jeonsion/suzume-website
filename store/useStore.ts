"use client";

import { create } from "zustand";

export type SectionId =
  | "opening"
  | "who-is-suzume"
  | "chair"
  | "cat"
  | "journey"
  | "ruins"
  | "final";

interface AppState {
  activeSection: SectionId | null;
  setActiveSection: (section: SectionId | null) => void;
  journeyStarted: boolean;
  setJourneyStarted: (v: boolean) => void;
  isTransitioning: boolean;
  setTransitioning: (v: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
  journeyStarted: false,
  setJourneyStarted: (v) => set({ journeyStarted: v }),
  isTransitioning: false,
  setTransitioning: (v) => set({ isTransitioning: v }),
}));
