export const detectBrowserLanguage = () => {
  const languageFromLocalStorage = localStorage.getItem('language')

  if (languageFromLocalStorage) {
    return languageFromLocalStorage
  }

  if (navigator.language.startsWith('en')) {
    return 'en'
  }

  return 'en'
}
