import { styled } from '@linaria/react'
import { fromNano } from '@ton/core'
import React, { FC } from 'react'
import { BoxChoice } from '../hooks/useBoxes'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from './Typography'

export const BoxChoiceView: FC<
  BoxChoice & {
    onPollItemClick: (index: number) => void
    isExpired: boolean
    largestVoteAmount: number
  }
> = ({
  choiceIndex,
  choice,
  votesAmount,
  onPollItemClick,
  isExpired,
  largestVoteAmount,
  votes,
}) => {
  const handlePollItemClick = () => {
    if (!isExpired) {
      onPollItemClick(choiceIndex)
    }
  }

  const _votesAmount = Number(votesAmount)
  const progressLineGradient = largestVoteAmount === _votesAmount
  const progressPercent =
    _votesAmount === 0 ? 0 : (_votesAmount / largestVoteAmount) * 100

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
          {choice}
        </Typography>
        <ProgressBar
          style={{ width: `${progressPercent}%` }}
          progressLineGradient={progressLineGradient}
        />
      </Content>
      <Value>
        <Typography fontSize={16} fontWeight={700}>
          {fromNano(votesAmount)} <TonWrapper>TON</TonWrapper>
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
