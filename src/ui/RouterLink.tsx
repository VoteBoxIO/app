import React, { ComponentProps, FC } from 'react'
import { Link } from 'react-router'

export const RouterLink: FC<ComponentProps<typeof Link>> = props => {
  return <Link {...props} />
}
