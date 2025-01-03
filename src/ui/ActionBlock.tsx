import { css, LinariaClassName } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Link } from 'react-router'
import { TitleAndSubtitle } from './TitleAndSubtitle'

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
        <TitleAndSubtitle title={title} subtitle={subtitle} />
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
  white: css`
    background: rgba(244, 244, 244, 1);
  `,
}
const ActionBlockButton = styled.div`
  height: 100%;
  padding: 12px 16px;
  border-radius: 16px;

  & > * + * {
    margin-top: 12px;
  }
`
const IconWrapper = styled.div`
  height: 47px;
  padding: 8px;
`
