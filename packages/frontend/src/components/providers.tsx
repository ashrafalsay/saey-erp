"use client";

import React, { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, locale } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
