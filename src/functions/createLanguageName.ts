export const createLanguageName = (language: string) => {
  switch (language) {
    case 'ru':
      return 'Русский'
    case 'en':
      return 'English'
    default:
      return 'English'
  }
}
