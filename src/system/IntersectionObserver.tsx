import React, { FC } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type IntersectionObserverChildrenProps = {
  setNode?: (node: HTMLElement | null) => void
  entry?: IntersectionObserverEntry | null
}

export const IntersectionObserver: FC<{
  enabled?: boolean
  intersectionObserverInit?: IntersectionObserverInit
  children: (props: IntersectionObserverChildrenProps) => React.ReactNode
}> = ({ enabled = true, intersectionObserverInit, children }) => {
  const { entry, setNode } = useIntersectionObserver(intersectionObserverInit)

  return children({
    setNode: enabled ? setNode : undefined,
    entry: enabled ? entry : undefined,
  })
}
