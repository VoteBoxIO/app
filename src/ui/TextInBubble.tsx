import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren } from 'react'
import { textOverflowCss } from '../styles/textOverflowCss'
import { Typography } from './Typography'

export const TextInBubble: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TextInBubbleContainer className={textOverflowCss}>
      <Typography fontSize={14} fontWeight={500} className={textOverflowCss}>
        {children}
      </Typography>
    </TextInBubbleContainer>
  )
}

const TextInBubbleContainer = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 8px 12px;
  border-radius: 99px;
`
