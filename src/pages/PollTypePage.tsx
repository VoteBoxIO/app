import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { ActionBlockWithButton } from '../ui/ActionBlock'
import { Rhytm } from '../ui/Rhytm'
import { TextWithArrow } from '../ui/TextWithArrow'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { createMoneyPoolPagePath } from './CreateMoneyPoolPage'
import { howToCreatePollPagePath } from './HowToCreatePollPage'

export const PollTypePage: FC = () => {
  return (
    <CreateVotingPageContainer>
      <Rhytm gap="16px">
        <TitleAndSubtitle
          title={
            <FormattedMessage
              id="create-voting-title"
              defaultMessage="Создание голосования"
            />
          }
          titleFontSize={24}
          subtitle={
            <FormattedMessage
              id="create-voting-type"
              defaultMessage="Выберите тип голосования и настройте параметры"
            />
          }
        />
        <TextWithArrow to={howToCreatePollPagePath}>
          <FormattedMessage id="how-to-create" defaultMessage="Как создать" />
        </TextWithArrow>

        <ActionBlockWithButton
          color="white"
          buttonColor="purple"
          to={createMoneyPoolPagePath}
          title={
            <FormattedMessage id="money-pool" defaultMessage="Денежный пул" />
          }
          subtitle={
            <FormattedMessage
              id="money-pool-description"
              defaultMessage="Победители делят деньги проигравших. Голосовать можно неограниченное количество раз."
            />
          }
          buttonText={
            <FormattedMessage
              id="money-pool-button"
              defaultMessage="Создать голосование"
            />
          }
        />

        <ActionBlockWithButton
          color="peach"
          buttonColor="peach"
          to={pollTypePagePath}
          title={
            <FormattedMessage
              id="paid-voting-title"
              defaultMessage="Платное голосование"
            />
          }
          subtitle={
            <FormattedMessage
              id="paid-voting-subtitle"
              defaultMessage="Все участники получают доступ к контенту. Один голос – фиксированная стоимость."
            />
          }
          buttonText={
            <FormattedMessage
              id="paid-voting-button"
              defaultMessage="Создать голосование"
            />
          }
        />
      </Rhytm>
    </CreateVotingPageContainer>
  )
}

export const pollTypePagePath = '/poll-type'

const CreateVotingPageContainer = styled.div``
