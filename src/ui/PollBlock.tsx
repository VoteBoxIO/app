import { styled } from '@linaria/react'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonRegular } from './Button'
import { Loader } from './Loader'
import { PollBlockItem } from './PollBlockItem'
import { Rhytm } from './Rhytm'
import { TextInBubble } from './TextInBubble'
import { TitleAndSubtitle } from './TitleAndSubtitle'
import { css } from '@linaria/core'

type PollBlockItemProps = ComponentProps<typeof PollBlockItem>
export type PollOption = Omit<
  PollBlockItemProps,
  'onPollItemClick' | 'isExpired'
>

export const PollBlock: FC<{
  title: ReactNode
  expiration: ReactNode
  bid: ReactNode
  commission: ReactNode
  pollOption: PollOption[]
  loading: boolean
  loadingError: boolean
  onPollItemClick: PollBlockItemProps['onPollItemClick']
  bottomElement?: ReactNode
  onRetryLoading: VoidFunction
  isExpired: boolean
}> = ({
  title,
  expiration,
  bid,
  commission,
  pollOption,
  loading,
  loadingError,
  onPollItemClick,
  bottomElement,
  onRetryLoading,
  isExpired,
}) => {
  return (
    <PollBlockContainer>
      <PollInfo>
        <TextInBubble>{expiration}</TextInBubble>
        <TextInBubble>{bid}</TextInBubble>
        <TextInBubble>{commission}</TextInBubble>
      </PollInfo>

      <TitleAndSubtitle title={title} />

      {loadingError ? (
        <ButtonRegular color="peach" onClick={onRetryLoading}>
          <FormattedMessage
            id="error-loading"
            defaultMessage="Ошибка загрузки. Повторить"
          />
        </ButtonRegular>
      ) : loading || !pollOption.length ? (
        <Loader className={loaderCss} />
      ) : (
        <PollItems>
          {pollOption.map(item => {
            return (
              <PollBlockItem
                key={item.name}
                {...item}
                onPollItemClick={onPollItemClick}
                isExpired={isExpired}
              />
            )
          })}
        </PollItems>
      )}
      {bottomElement}
    </PollBlockContainer>
  )
}

const loaderCss = css`
  padding: 30px 0;
`
const PollItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: max-content auto max-content;
  gap: 12px;
  grid-gap: 12px;
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
  & > * + * {
    margin-top: 12px;
  }
`
