import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { Typography } from './Typography'

export const TitleAndSubtitle: FC<{
  title: ReactNode
  titleFontSize?: ComponentProps<typeof Typography>['fontSize']
  subtitle?: ReactNode
  gap?: string
}> = ({ title, subtitle, titleFontSize = 20, gap = '4px' }) => {
  return (
    <Block gap={gap}>
      <Typography fontSize={titleFontSize} fontWeight={600}>
        {title}
      </Typography>
      {subtitle && (
        <Typography fontSize={16} fontWeight={400}>
          {subtitle}
        </Typography>
      )}
    </Block>
  )
}

const Block = styled.div<{ gap: string }>`
  display: grid;
  gap: ${props => props.gap};
  grid-gap: ${props => props.gap};
`
