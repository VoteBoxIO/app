import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { PollBlockItem } from './PollBlockItem'
import { Rhytm } from './Rhytm'
import { TextInBubble } from './TextInBubble'
import { TitleAndSubtitle } from './TitleAndSubtitle'

type PollBlockItemProps = ComponentProps<typeof PollBlockItem>

export const PollBlock: FC<{
  title: ReactNode
  subtitle: ReactNode
  expiration: ReactNode
  bid: ReactNode
  commission: ReactNode
  pollItems: Omit<PollBlockItemProps, 'onPollItemClick'>[]
  onPollItemClick: PollBlockItemProps['onPollItemClick']
}> = ({
  title,
  subtitle,
  expiration,
  bid,
  commission,
  pollItems,
  onPollItemClick,
}) => {
  return (
    <PollBlockContainer>
      <PollInfo>
        <TextInBubble>{expiration}</TextInBubble>
        <TextInBubble>{bid}</TextInBubble>
        <TextInBubble>{commission}</TextInBubble>
      </PollInfo>

      <TitleAndSubtitle title={title} subtitle={subtitle} />

      <PollItems>
        {pollItems.map(item => {
          return (
            <PollBlockItem
              key={item.id}
              {...item}
              onPollItemClick={onPollItemClick}
            />
          )
        })}
      </PollItems>
    </PollBlockContainer>
  )
}

const PollItems = styled.div`
  & > * + * {
    margin-top: 12px;
  }
`
const PollInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 10px;
`
const PollBlockContainer = styled(Rhytm)`
  background: rgba(240, 240, 245, 1);
  padding: 16px;
  border-radius: 16px;
`
