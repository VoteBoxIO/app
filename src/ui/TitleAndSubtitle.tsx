import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { Typography } from './Typography'

export const TitleAndSubtitle: FC<{
  title: ReactNode
  titleFontSize?: ComponentProps<typeof Typography>['fontSize']
  subtitle: ReactNode
}> = ({ title, subtitle, titleFontSize = 20 }) => {
  return (
    <Block>
      <Typography fontSize={titleFontSize} fontWeight={600}>
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={400}>
        {subtitle}
      </Typography>
    </Block>
  )
}

const Block = styled.div`
  display: grid;
  gap: 4px;
  grid-gap: 2px;
`
