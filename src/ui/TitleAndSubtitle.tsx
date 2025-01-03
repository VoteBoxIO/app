import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Typography } from './Typography'

export const TitleAndSubtitle: FC<{
  title: ReactNode
  subtitle: ReactNode
}> = ({ title, subtitle }) => {
  return (
    <Block>
      <Typography fontSize={20} fontWeight={600}>
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={400}>
        {subtitle}
      </Typography>
    </Block>
  )
}

const Block = styled.div``
