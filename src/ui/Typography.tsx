import React, {
  CSSProperties,
  ElementType,
  PropsWithChildren,
  forwardRef,
} from 'react'

import { css, cx, LinariaClassName } from '@linaria/core'
import { styled } from '@linaria/react'

export type Props = {
  fontSize: FontSize
  fontWeight?: FontWeight
  tag?: ElementType
  style?: CSSProperties
  className?: string
} & PropsWithChildren

export const Typography = forwardRef<HTMLHeadingElement, Props>(
  ({ className, fontSize, fontWeight = 400, children, tag, style }, ref) => {
    return (
      <Text
        ref={ref}
        style={style}
        className={cx(
          commonCss,
          typographyMap[fontSize],
          fontWeightMap[fontWeight],
          className,
        )}
        as={tag}
      >
        {children}
      </Text>
    )
  },
)

export type FontSize = 28 | 24 | 20 | 16 | 14 | 12
type FontWeight = 400 | 500 | 600 | 700

const Text = styled.p``
const commonCss = css`
  font-style: normal;
  font-weight: 400;
  color: black;
`
const typographyMap: Record<FontSize, LinariaClassName> = {
  28: css`
    font-family: Manrope;
    font-size: 28px;
    font-weight: 600;
    line-height: 32px;
  `,
  24: css`
    font-family: Manrope;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
  `,
  20: css`
    font-family: Manrope;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  `,
  16: css`
    font-family: Manrope;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  `,
  14: css`
    font-family: Manrope;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  `,
  12: css`
    font-family: Manrope;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  `,
}

const fontWeightMap: Record<FontWeight, LinariaClassName> = {
  400: css`
    font-weight: 400;
  `,
  500: css`
    font-weight: 500;
  `,
  600: css`
    font-weight: 600;
  `,
  700: css`
    font-weight: 700;
  `,
}
