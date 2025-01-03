import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Typography } from './Typography'
import { css, LinariaClassName } from '@linaria/core'
import { Link } from 'react-router'

export const ActionBlock: FC<{
  variant: Variant
  to: string
  icon: ReactNode
  title: ReactNode
  subtitle: ReactNode
}> = ({ variant, to, icon, title, subtitle }) => {
  return (
    <Link to={to}>
      <ActionBlockButton className={variantCss[variant]}>
        <IconWrapper>{icon}</IconWrapper>
        <Block>
          <Typography fontSize={20} fontWeight={600}>
            {title}
          </Typography>
          <Typography fontSize={16} fontWeight={400}>
            {subtitle}
          </Typography>
        </Block>
      </ActionBlockButton>
    </Link>
  )
}

type Variant = 'purple' | 'peach' | 'white'

const variantCss: Record<Variant, LinariaClassName> = {
  purple: css`
    background: rgba(79, 82, 119, 1);
    p {
      color: rgba(255, 255, 255, 1);
    }
    svg {
      path {
        fill: #febd98;
      }
    }
  `,
  peach: css`
    background: rgba(255, 239, 230, 1);
  `,
  white: css``,
}

const ActionBlockButton = styled.div`
  display: grid;
  gap: 12px;
  grid-gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
`
const Block = styled.div``
const IconWrapper = styled.div`
  padding: 8px;
`
