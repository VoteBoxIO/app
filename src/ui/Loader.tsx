import React, { FC } from 'react'
import SvgLoader from '../svgr/Loader'
import { css } from '@linaria/core'

export const Loader: FC = () => {
  return (
    <div className={wrapperCss}>
      <div className={spinnerCss}>
        <SvgLoader />
      </div>
    </div>
  )
}

const wrapperCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: inherit;
  box-sizing: border-box;
`

const spinnerCss = css`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  animation: spin 2s linear infinite;
`
