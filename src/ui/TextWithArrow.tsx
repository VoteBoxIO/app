import { styled } from '@linaria/react'
import { Link } from 'react-router'
import SvgArrowRight from '../svgr/ArrowRight'
import { Typography } from './Typography'
import React, { FC, PropsWithChildren } from 'react'

export const TextWithArrow: FC<PropsWithChildren & { to: string }> = ({
  to,
  children,
}) => {
  return (
    <Link to={to}>
      <TextWithArrowContainer>
        <Typography fontSize={14} fontWeight={700}>
          {children}
        </Typography>
        <SvgArrowRight />
      </TextWithArrowContainer>
    </Link>
  )
}

const TextWithArrowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 4px;
  gap: 4px;
  grid-template-columns: auto 1fr;
`
