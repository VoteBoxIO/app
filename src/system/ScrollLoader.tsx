import { FC, PropsWithChildren, RefObject, useEffect } from 'react'
import {
  shouldLoadMoreByElementScroll,
  shouldLoadMoreByDocumentScrollHeight,
} from '../functions/shouldLoadMoreByDocumentScrollHeight'

/**
 * Вызывает подгрузку, если она необходима.
 * @param onShouldLoad вызов подгрузки
 * @param loading
 * @param refObjectGetter указатель на элемент (либо используется окно)
 * @param children
 * @constructor
 */
export const ScrollLoader: FC<
  {
    onShouldLoad: VoidFunction
    loading: boolean
    refObjectGetter?: () => RefObject<HTMLElement> | null
  } & PropsWithChildren
> = ({ onShouldLoad, loading, refObjectGetter, children }) => {
  useEffect(() => {
    const modalElement = refObjectGetter?.()
    const current = modalElement?.current || window
    const condition = modalElement?.current
      ? () =>
          shouldLoadMoreByElementScroll(modalElement?.current as HTMLElement)
      : () => shouldLoadMoreByDocumentScrollHeight()

    const handleScroll = () => {
      if (!loading && condition()) {
        onShouldLoad()
      }
    }

    if (current) {
      if (loading) {
        current.removeEventListener('scroll', handleScroll)
      } else {
        current.addEventListener('scroll', handleScroll)
      }
    }

    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loading, onShouldLoad, refObjectGetter])

  return children
}
