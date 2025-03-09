import { styled } from '@linaria/react'
import React, { FC } from 'react'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from './Typography'
import { LoadingMessage } from './LoadingMessage'

export const PollBlockItem: FC<{
  name: string
  value: string | null
  index: number
  progressPercent: number
  progressLineGradient: boolean
  onPollItemClick: (index: number) => void
  isExpired: boolean
}> = ({
  name,
  value,
  index,
  progressPercent,
  progressLineGradient,
  onPollItemClick,
  isExpired,
}) => {
  const handlePollItemClick = () => {
    if (isExpired) {
      return
    }
    onPollItemClick(index)
  }

  return (
    <>
      <Plus
        onClick={handlePollItemClick}
        {...(isExpired && {
          style: {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        })}
      >
        <SvgPlusSmall />
      </Plus>
      <Content>
        <Typography fontSize={16} fontWeight={500}>
          {name}
        </Typography>
        <ProgressBar
          style={{ width: `${progressPercent}%` }}
          progressLineGradient={progressLineGradient}
        />
      </Content>
      <Value>
        <Typography fontSize={16} fontWeight={700}>
          {value === null ? <LoadingMessage /> : value}
          <TonWrapper>TON</TonWrapper>
        </Typography>
      </Value>
    </>
  )
}

const TonWrapper = styled.span`
  color: rgba(194, 195, 214, 1);
`
const ProgressBar = styled.div<{ progressLineGradient: boolean }>`
  height: 8px;
  border-radius: 99px;
  background: ${({ progressLineGradient }) =>
    progressLineGradient ? PROGRESS_GRADIENT : PROGRESS_DEFAULT};
`
const Plus = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  cursor: pointer;
`
const Content = styled.div`
  width: 100%;
`
const Value = styled.div`
  display: flex;
  align-items: end;
  margin-top: 15px;
`

const PROGRESS_GRADIENT =
  'linear-gradient(90deg, #FFDFCC 0%, #FBBB98 25.5%, #A3A5C2 66.5%, #4F5277 100%)'
const PROGRESS_DEFAULT = 'rgba(194, 195, 214, 1)'
