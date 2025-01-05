import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Typography } from './Typography'

export const Toggle: FC<{
  checked: boolean
  onChange: (checked: boolean) => void
  label: ReactNode
}> = ({ checked, onChange, label }) => {
  return (
    <ToggleContainer>
      <ToggleWrapper onClick={() => onChange(!checked)} checked={checked}>
        <ToggleCircle />
      </ToggleWrapper>
      <Typography fontSize={16} fontWeight={700}>
        {label}
      </Typography>
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const ToggleWrapper = styled.div<{ checked: boolean }>`
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ checked }) =>
    checked ? 'rgba(254, 189, 152, 1)' : '#e8e8e8'};
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-end' : 'flex-start')};
  cursor: pointer;
  transition:
    background-color 0.2s,
    justify-content 0.2s;
  width: 43.2px;
  gap: 0px;
  border: 2px solid rgba(79, 82, 119, 1);
`
const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: rgba(79, 82, 119, 1);
  border-radius: 50%;
  transition: background-color 0.2s;
  zoom: 1.03;
`
