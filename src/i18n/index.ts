import { S_N_LANG } from '@/const/storage.ts'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.ts'
import zh from './zh-CN.ts'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: getDefaultLang(),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
})

function getDefaultLang() {
  const storageValue = localStorage.getItem(S_N_LANG)
  if (storageValue === 'en' || storageValue === 'zh') return storageValue

  return navigator.language?.startsWith('zh-') ? 'zh' : 'en'
}

export function setLanguage(lang: 'en' | 'zh') {
  i18n.changeLanguage(lang)
  localStorage.setItem(S_N_LANG, lang)
}

export default i18n
