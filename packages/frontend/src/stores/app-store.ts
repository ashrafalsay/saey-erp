"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/i18n";

interface AppState {
  locale: Locale;
  theme: "light" | "dark" | "system";
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: "ar",
      theme: "light",
      sidebarCollapsed: false,
      sidebarMobileOpen: false,
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
    }),
    {
      name: "saey-app-settings",
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
