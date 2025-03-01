import React, { ComponentProps, FC } from 'react'
import { VoteSettingsInner } from './VoteSettingsInner'
import { IntersectionObserver } from '../system/IntersectionObserver'

export const VoteSettings: FC<
  Omit<ComponentProps<typeof VoteSettingsInner>, 'isIntersecting'> & {}
> = props => {
  return (
    <IntersectionObserver>
      {({ setNode, entry }) => {
        return (
          <div ref={setNode}>
            <VoteSettingsInner
              {...props}
              isIntersecting={entry?.isIntersecting}
            />
          </div>
        )
      }}
    </IntersectionObserver>
  )
}
