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
          typographyMapCss[fontSize],
          fontFamilyMapCss[fontSize],
          fontWeightMapCss[fontWeight],
          className,
        )}
        as={tag}
      >
        {children}
      </Text>
    )
  },
)
Typography.displayName = 'Typography'

export type FontSize = 28 | 24 | 20 | 16 | 14 | 12
export type FontWeight = 400 | 500 | 600 | 700

const Text = styled.p`
  word-break: break-word;
`
export const typographyMapCss: Record<FontSize, LinariaClassName> = {
  28: css`
    font-size: 28px;
    font-weight: 600;
    line-height: 32px;
  `,
  24: css`
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
  `,
  20: css`
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  `,
  16: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  `,
  14: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  `,
  12: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  `,
}
export const fontWeightMapCss: Record<FontWeight, LinariaClassName> = {
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
const manropeFontCss = css`
  color: black;
  font-family: 'Manrope', serif;
  font-optical-sizing: auto;
  font-style: normal;
`
const robotoFontCss = css`
  color: black;
  font-family: 'Roboto', serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
`
export const fontFamilyMapCss: Record<FontSize, LinariaClassName> = {
  28: robotoFontCss,
  24: robotoFontCss,
  20: robotoFontCss,
  16: manropeFontCss,
  14: manropeFontCss,
  12: manropeFontCss,
}
