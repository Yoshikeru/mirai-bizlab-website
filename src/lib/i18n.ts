'use client';

import { createContext, useContext } from 'react';
import ja from '@/locales/ja.json';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

export type Locale = 'ja' | 'en' | 'th';

const translations = { ja, en, th } as const;

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  th: 'ไทย',
};

export const localeFlags: Record<Locale, string> = {
  ja: '🇯🇵',
  en: '🇬🇧',
  th: '🇹🇭',
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof ja>;

export function getTranslation(locale: Locale) {
  const t = translations[locale];

  function translate(key: string): any {
    const keys = key.split('.');
    let result: any = t;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  }

  return translate;
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any;
}

export const I18nContext = createContext<I18nContextType>({
  locale: 'ja',
  setLocale: () => {},
  t: (key: string) => key,
});

export const useI18n = () => useContext(I18nContext);
