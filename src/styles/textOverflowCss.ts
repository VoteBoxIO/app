import { css } from '@linaria/core'

export const textOverflowStyles = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const textOverflowCss = css`
  ${textOverflowStyles};
`
