import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { ActionBlockWithButton } from '../ui/ActionBlock'
import { Rhytm } from '../ui/Rhytm'
import { TextWithArrow } from '../ui/TextWithArrow'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { howToCreatePollPagePath } from './HowToCreatePollPage'

export const PollTypePage: FC = () => {
  return (
    <CreateVotingPageContainer>
      <Rhytm gap="16px">
        <TitleAndSubtitle
          title="Создание голосования"
          titleFontSize={24}
          subtitle="Выберите тип голосования и настройте параметры"
        />
        <TextWithArrow to={howToCreatePollPagePath}>Как создать</TextWithArrow>

        <ActionBlockWithButton
          color="white"
          buttonColor="purple"
          to={pollTypePagePath}
          title="Денежный пул"
          subtitle="Победители делят деньги проигравших. Голосовать можно неограниченное количество раз."
          buttonText="Создать голосование"
        />

        <ActionBlockWithButton
          color="peach"
          buttonColor="peach"
          to={pollTypePagePath}
          title="Платное голосование"
          subtitle="Все участники получают доступ к контенту. Один голос – фиксированная стоимость."
          buttonText="Создать голосование"
        />
      </Rhytm>
    </CreateVotingPageContainer>
  )
}

export const pollTypePagePath = '/poll-type'

const CreateVotingPageContainer = styled.div``
