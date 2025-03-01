import { useState, useRef, useEffect } from 'react'

export const useIntersectionObserver = ({
  root = null,
  rootMargin,
  threshold = 0,
}: IntersectionObserverInit = {}) => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry | null>(null)
  const [node, setNode] = useState<HTMLElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        updateEntry(entry)
      },
      { root, rootMargin, threshold },
    )

    const { current: currentObserver } = observer

    if (node) {
      currentObserver.observe(node)
    }

    return () => {
      currentObserver.disconnect()
    }
  }, [node, root, rootMargin, threshold])

  return { setNode, entry }
}
