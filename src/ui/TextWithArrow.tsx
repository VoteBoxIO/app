import { styled } from '@linaria/react'
import SvgArrowRight from '../svgr/ArrowRight'
import { Typography } from './Typography'
import React, { FC, PropsWithChildren } from 'react'
import { RouterLink } from './RouterLink'

export const TextWithArrow: FC<PropsWithChildren & { to: string }> = ({
  to,
  children,
}) => {
  return (
    <RouterLink to={to}>
      <TextWithArrowContainer>
        <Typography fontSize={14} fontWeight={700}>
          {children}
        </Typography>
        <SvgArrowRight />
      </TextWithArrowContainer>
    </RouterLink>
  )
}

const TextWithArrowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 4px;
  gap: 4px;
  grid-template-columns: auto 1fr;
`
