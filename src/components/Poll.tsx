import React, { ComponentProps, FC } from 'react'
import { PollInner } from './PollInner'
import { IntersectionObserver } from '../system/IntersectionObserver'

export const Poll: FC<
  Omit<ComponentProps<typeof PollInner>, 'isIntersecting'> & {}
> = props => {
  return (
    <IntersectionObserver>
      {({ setNode, entry }) => {
        return (
          <div ref={setNode}>
            <PollInner {...props} isIntersecting={entry?.isIntersecting} />
          </div>
        )
      }}
    </IntersectionObserver>
  )
}
