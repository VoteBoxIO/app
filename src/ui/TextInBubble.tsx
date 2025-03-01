import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren } from 'react'
import { Typography } from './Typography'
import { textOverflowStyles } from '../styles/textOverflowCss'

export const TextInBubble: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TextInBubbleContainer className={textOverflowStyles}>
      <Typography fontSize={14} fontWeight={500} className={textOverflowStyles}>
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
