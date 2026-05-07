"use client";

import { useCallback } from "react";
import { useAppStore } from "@/stores/app-store";
import { getTranslation, isRtl } from "@/i18n";

export function useTranslation() {
  const locale = useAppStore((state) => state.locale);

  const t = useCallback(
    (key: string): string => {
      return getTranslation(locale, key);
    },
    [locale]
  );

  return {
    t,
    locale,
    dir: isRtl(locale) ? "rtl" as const : "ltr" as const,
    isRtl: isRtl(locale),
  };
}
