import { styled } from '@linaria/react'
import React, { FC } from 'react'
import SvgPlusSmall from '../svgr/PlusSmall'
import { Typography } from './Typography'

export const PollBlockItem: FC<{
  name: string
  value: string | null
  index: number
  progressPercent: number
  progressLineGradient: boolean
  onPollItemClick: (index: number) => void
}> = ({
  name,
  value,
  index,
  progressPercent,
  progressLineGradient,
  onPollItemClick,
}) => {
  const handlePollItemClick = () => {
    onPollItemClick(index)
  }

  return (
    <PollBlockItemContainer onClick={handlePollItemClick}>
      <Block>
        <Plus>
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
const Plus = styled.div`
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
const PollBlockItemContainer = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const PROGRESS_GRADIENT =
  'linear-gradient(90deg, #FFDFCC 0%, #FBBB98 25.5%, #A3A5C2 66.5%, #4F5277 100%)'
const PROGRESS_DEFAULT = 'rgba(194, 195, 214, 1)'
