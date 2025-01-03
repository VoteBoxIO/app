export const loadLocaleData = (locale: string) => {
  switch (locale) {
    case 'en':
      return import('../compiled-lang/en.json')
    default:
      return import('../compiled-lang/ru.json')
  }
}
