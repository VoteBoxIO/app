import { LinariaClassName, css } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { ComponentProps, FC, PropsWithChildren } from 'react'
import { Typography } from './Typography'
import { RouterLink } from './RouterLink'
import { Loader } from './Loader'

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
  ComponentProps<typeof ButtonStyled> & {
    color: Color
    loading?: boolean
  }
> = ({ children, color, loading, disabled, ...props }) => {
  return (
    <ButtonStyled {...props} disabled={disabled || loading}>
      <ButtonContainer className={colorCss[color]}>
        <Typography fontSize={16} fontWeight={600}>
          {loading ? <ButtonLoader /> : children}
        </Typography>
      </ButtonContainer>
    </ButtonStyled>
  )
}

type Color = 'purple' | 'peach'

const BUTTON_HEIGHT = 52

const ButtonLoader = styled(Loader)`
  svg {
    width: 20px;
    height: 20px;
  }
`
const ButtonStyled = styled.button`
  height: ${BUTTON_HEIGHT}px;
  transition: opacity 0.2s;
  &:disabled {
    opacity: 0.5;
  }
`
const ButtonContainer = styled.div`
  height: ${BUTTON_HEIGHT}px;
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
