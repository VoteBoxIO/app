import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Typography } from './Typography'

export const DetailsItem: FC<{ name: ReactNode; value: ReactNode }> = ({
  name,
  value,
}) => {
  return (
    <DetailsItemContainer>
      <Typography
        fontSize={14}
        fontWeight={500}
        style={{ color: 'rgba(132, 135, 174, 1)' }}
      >
        {name}
      </Typography>
      <Typography fontSize={16} fontWeight={500}>
        {value}
      </Typography>
    </DetailsItemContainer>
  )
}

const DetailsItemContainer = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(224, 225, 235, 1);
`
