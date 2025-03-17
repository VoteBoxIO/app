import { LinariaClassName, css } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { ComponentProps, FC, PropsWithChildren } from 'react'
import { Typography } from './Typography'
import { RouterLink } from './RouterLink'

export const ButtonLink: FC<
  PropsWithChildren & {
    to: string
    color: Color
  }
> = ({ to, color, children }) => {
  return (
    <RouterLink to={to} style={{ display: 'block' }}>
      <ButtonContainer className={colorCss[color]}>
        <Typography fontSize={16} fontWeight={600}>
          {children}
        </Typography>
      </ButtonContainer>
    </RouterLink>
  )
}

export const ButtonRegular: FC<
  ComponentProps<typeof StyledButton> & {
    color: Color
  }
> = ({ children, color, ...props }) => {
  return (
    <StyledButton {...props}>
      <ButtonContainer className={colorCss[color]}>
        <Typography fontSize={16} fontWeight={600}>
          {children}
        </Typography>
      </ButtonContainer>
    </StyledButton>
  )
}

type Color = 'purple' | 'peach'

const StyledButton = styled.button`
  transition: opacity 0.2s;
  &:disabled {
    opacity: 0.5;
  }
`
const ButtonContainer = styled.div`
  padding: 16px 20px;
  border-radius: 26px;
  cursor: pointer;
  text-align: center;

  > * {
    color: white;
  }
`
const colorCss: Record<Color, LinariaClassName> = {
  purple: css`
    background: rgba(79, 82, 119, 1);
  `,
  peach: css`
    background: rgba(254, 158, 103, 1);
  `,
}
