import React, { FC, PropsWithChildren } from 'react'
import { Typography } from './Typography'

export const ErrorText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography fontSize={14} style={{ color: '#FF3300' }}>
      {children}
    </Typography>
  )
}
