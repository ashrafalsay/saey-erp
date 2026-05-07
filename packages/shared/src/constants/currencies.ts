export interface CurrencyInfo {
  code: string;
  name: string;
  nameAr: string;
  symbol: string;
  decimals: number;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  SAR: { code: 'SAR', name: 'Saudi Riyal', nameAr: 'ريال سعودي', symbol: 'ر.س', decimals: 2 },
  AED: { code: 'AED', name: 'UAE Dirham', nameAr: 'درهم إماراتي', symbol: 'د.إ', decimals: 2 },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', symbol: 'د.ك', decimals: 3 },
  BHD: { code: 'BHD', name: 'Bahraini Dinar', nameAr: 'دينار بحريني', symbol: 'د.ب', decimals: 3 },
  QAR: { code: 'QAR', name: 'Qatari Riyal', nameAr: 'ريال قطري', symbol: 'ر.ق', decimals: 2 },
  OMR: { code: 'OMR', name: 'Omani Rial', nameAr: 'ريال عماني', symbol: 'ر.ع', decimals: 3 },
  EGP: { code: 'EGP', name: 'Egyptian Pound', nameAr: 'جنيه مصري', symbol: 'ج.م', decimals: 2 },
  JOD: { code: 'JOD', name: 'Jordanian Dinar', nameAr: 'دينار أردني', symbol: 'د.أ', decimals: 3 },
  USD: { code: 'USD', name: 'US Dollar', nameAr: 'دولار أمريكي', symbol: '$', decimals: 2 },
  EUR: { code: 'EUR', name: 'Euro', nameAr: 'يورو', symbol: '€', decimals: 2 },
  GBP: { code: 'GBP', name: 'British Pound', nameAr: 'جنيه إسترليني', symbol: '£', decimals: 2 },
};
