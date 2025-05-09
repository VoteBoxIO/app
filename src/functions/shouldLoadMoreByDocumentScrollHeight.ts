export const getBodyScrollTop = () => {
  const element = document.scrollingElement || document.documentElement
  return element.scrollTop
}

/**
 * Определение докрутил ли юзер до футера и нужно ли подгрузить новые элементы
 * @param coefficient Заменять на более вменяемую настройку при случае
 */
export const shouldLoadMoreByDocumentScrollHeight = (
  coefficient = 3,
  offsetTop = 0,
) => {
  const clientHeight = document.documentElement.clientHeight
  const currentScrollTop = Math.ceil(getBodyScrollTop()) - offsetTop
  const currentBottomScroll = currentScrollTop + clientHeight

  const scrollWithGap = currentBottomScroll + clientHeight * coefficient
  const documentFullLength = document.documentElement.scrollHeight

  return scrollWithGap >= documentFullLength
}

/**
 * Пора ли загружать, если еще что-то есть
 * @param element Элемент по которому замеряется скролл
 * @param pixels Количество пикселей от дна, при котором нужно начинать загрузку
 */
export const shouldLoadMoreByElementScroll = (
  element: HTMLElement,
  pixels = 300,
) => {
  const { scrollTop, clientHeight, scrollHeight } = element
  return scrollHeight - (scrollTop + clientHeight) < pixels
}
