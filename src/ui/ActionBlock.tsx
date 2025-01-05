import { css, LinariaClassName } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { Link } from 'react-router'
import { TitleAndSubtitle } from './TitleAndSubtitle'
import { ButtonLink } from './Button'

export const ActionBlockWithIcon: FC<{
  color: Color
  to: string
  icon: ReactNode
  title: ReactNode
  subtitle: ReactNode
}> = ({ color, to, icon, title, subtitle }) => {
  return (
    <Link to={to}>
      <ActionBlockInner className={colorCss[color]}>
        <IconWrapper>{icon}</IconWrapper>
        <TitleAndSubtitle title={title} subtitle={subtitle} />
      </ActionBlockInner>
    </Link>
  )
}

export const ActionBlockWithButton: FC<{
  color: Color
  buttonColor: ComponentProps<typeof ButtonLink>['color']
  to: string
  title: ReactNode
  subtitle: ReactNode
  buttonText: ReactNode
}> = ({ to, color, buttonColor, title, subtitle, buttonText }) => {
  return (
    <ActionBlockInner className={colorCss[color]}>
      <TitleAndSubtitle title={title} subtitle={subtitle} />
      <ButtonLink to={to} color={buttonColor}>
        {buttonText}
      </ButtonLink>
    </ActionBlockInner>
  )
}

type Color = 'purple' | 'peach' | 'white'

const colorCss: Record<Color, LinariaClassName> = {
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
const ActionBlockInner = styled.div`
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
