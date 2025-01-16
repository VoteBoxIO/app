import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from './Typography'

export const PollBlockItem: FC<{
  id: string | number
  name: ReactNode
  value: ReactNode
  progressPercent: number
  progressLineGradient: boolean
  onPollItemClick: (id: string | number) => void
}> = ({
  id,
  name,
  value,
  progressPercent,
  progressLineGradient,
  onPollItemClick,
}) => {
  const handlePollItemClick = () => {
    onPollItemClick(id)
  }

  return (
    <PollBlockItemContainer>
      <Block>
        <VoteButton onClick={handlePollItemClick}>
          <SvgPlusSmall />
        </VoteButton>
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
            {value}
            <TonWrapper>TON</TonWrapper>
          </Typography>
        </Value>
      </Block>
    </PollBlockItemContainer>
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
const Block = styled.div`
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  display: flex;
  gap: 8px;
`
const VoteButton = styled.button`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
`
const Content = styled.div`
  width: 100%;
`
const Value = styled.div`
  display: flex;
  align-items: end;
  margin-left: 8px;
  margin-top: 12px;
`
const PollBlockItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const PROGRESS_GRADIENT =
  'linear-gradient(90deg, #FFDFCC 0%, #FBBB98 25.5%, #A3A5C2 66.5%, #4F5277 100%)'
const PROGRESS_DEFAULT = 'rgba(194, 195, 214, 1)'
