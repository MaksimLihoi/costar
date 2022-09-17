//  @flow
import {I18n} from 'i18n-js';
import en from './locales/en';
import zh from './locales/zh'; /*
const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  zh,
};
*/

/*
const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  zh,
};
*/

export const resources = new I18n({
  en,
  zh,
});
