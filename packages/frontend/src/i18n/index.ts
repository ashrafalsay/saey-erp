import { ar, type TranslationKeys } from "./ar";
import { en } from "./en";

export type Locale = "ar" | "en";

const translations: Record<Locale, TranslationKeys> = { ar, en };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<TranslationKeys>;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  let result: unknown = translations[locale];
  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === "string" ? result : key;
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export { ar, en };
