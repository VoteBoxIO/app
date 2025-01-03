import { LinariaClassName, css } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router'
import { Typography } from './Typography'

export const Button: FC<PropsWithChildren & { to?: string; color: Color }> = ({
  to,
  color,
  children,
}) => {
  if (to) {
    return (
      <Link to={to} style={{ display: 'block' }}>
        <ButtonContainer className={colorCss[color]}>
          <Typography fontSize={16} fontWeight={600}>
            {children}
          </Typography>
        </ButtonContainer>
      </Link>
    )
  }

  return null
}

type Color = 'purple' | 'peach'

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
