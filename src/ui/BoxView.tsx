import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { BoxChoiceView } from './BoxChoiceView'
import { Rhytm } from './Rhytm'
import { TextInBubble } from './TextInBubble'
import { TitleAndSubtitle } from './TitleAndSubtitle'
import { BoxChoice } from '../hooks/useBoxes'

export const BoxView: FC<{
  title: ReactNode
  expiration: ReactNode
  bid: ReactNode
  commission: ReactNode
  boxChoices: BoxChoice[]
  onPollItemClick: PollBlockItemProps['onPollItemClick']
  largestVoteAmount: number
  bottomElement?: ReactNode
  isExpired: boolean
}> = ({
  title,
  expiration,
  bid,
  commission,
  boxChoices,
  onPollItemClick,
  largestVoteAmount,
  bottomElement,
  isExpired,
}) => {
  return (
    <BoxContainer>
      <BoxInfo>
        <TextInBubble>{expiration}</TextInBubble>
        <TextInBubble>{bid} TON</TextInBubble>
        <TextInBubble>{commission}</TextInBubble>
      </BoxInfo>

      <TitleAndSubtitle title={title} />

      <BoxChoices>
        {boxChoices
          .sort((a, b) => a.choiceIndex - b.choiceIndex)
          .map(boxChoice => {
            return (
              <BoxChoiceView
                key={boxChoice.id}
                {...boxChoice}
                onPollItemClick={onPollItemClick}
                isExpired={isExpired}
                largestVoteAmount={largestVoteAmount}
              />
            )
          })}
      </BoxChoices>

      {bottomElement}
    </BoxContainer>
  )
}

type PollBlockItemProps = ComponentProps<typeof BoxChoiceView>
export type PollOption = Omit<
  PollBlockItemProps,
  'onPollItemClick' | 'isExpired'
>

const BoxChoices = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: max-content auto max-content;
  gap: 12px;
  grid-gap: 12px;
`
const BoxInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 10px;
`
const BoxContainer = styled(Rhytm)`
  background: rgba(240, 240, 245, 1);
  padding: 16px;
  border-radius: 16px;
  & > * + * {
    margin-top: 12px;
  }
`
