import VueI18n from 'vue-i18n'
import Vue from 'vue'
import en from './en'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
})

const loadedLanguages = ['en']

function setI18nLanguage(lang: string) {
  i18n.locale = lang
  document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAynsc(lang: string) {
  if (i18n.locale === lang || loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  return import(`./${lang}.ts`).then((message) => {
    i18n.setLocaleMessage(lang, message.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}
export default i18n
