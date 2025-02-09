import { styled } from '@linaria/react'
import React, { ComponentProps, FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useParams } from 'react-router'
import { PollBlock } from '../ui/PollBlock'
import { Rhytm } from '../ui/Rhytm'
import { Tabs } from '../ui/Tabs'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'

export const MyPollsPage: FC = () => {
  const params = useParams() as { id: PollType }
  const { formatMessage } = useIntl()

  const TABS = [
    {
      to: `${myPollsPagePartPath}/${PollType.Active}`,
      id: PollType.Active,
      label: formatMessage({ id: 'tab-active', defaultMessage: 'Активные' }),
    },
    {
      to: `${myPollsPagePartPath}/${PollType.Finished}`,
      id: PollType.Finished,
      label: formatMessage({
        id: 'tab-finished',
        defaultMessage: 'Завершенные',
      }),
    },
  ]

  const activeTabId = TABS.find(({ id }) => id === params.id)?.id!

  if (!activeTabId) {
    console.error('Active tab not found')
    return null
  }

  const handlePollItemClick: ComponentProps<
    typeof PollBlock
  >['onPollItemClick'] = id => {
    console.info('poll item clicked', id)
  }

  return (
    <MyVotingPageContainer>
      <TitleAndSubtitle
        title={
          <FormattedMessage id="my-polls-title" defaultMessage="Мои опросы" />
        }
        titleFontSize={24}
        subtitle={
          <FormattedMessage
            id="my-polls-subtitle"
            defaultMessage="Здесь собраны ваши опросы. Активные и завершенные."
          />
        }
      />

      <Rhytm style={{ marginTop: 24 }}>
        <Tabs tabs={TABS} activeTabId={activeTabId} />

        <PollBlock
          title="Закрытый опрос"
          subtitle="Проголосуй за лучшую книгу. Победители получат награду – ..."
          expiration="Ещё 2 ч"
          bid="2000 Ton"
          commission="Комиссия 6%"
          pollItems={[
            {
              index: 1,
              name: 'Тихий Дон',
              value: '500',
              progressPercent: 90,
              progressLineGradient: true,
            },
            {
              index: 2,
              name: 'Война и мир',
              value: '550',
              progressPercent: 100,
              progressLineGradient: false,
            },
            {
              index: 3,
              name: 'Вишнёвый сад',
              value: '510',
              progressPercent: 70,
              progressLineGradient: false,
            },
            {
              index: 4,
              name: 'Герой нашего времени',
              value: '440',
              progressPercent: 40,
              progressLineGradient: false,
            },
          ]}
          onPollItemClick={handlePollItemClick}
        />
      </Rhytm>
    </MyVotingPageContainer>
  )
}

const MyVotingPageContainer = styled.div``

export const myPollsPagePartPath = '/my-polls'
export const myPollsPagePath = '/my-polls/:id'

export enum PollType {
  Active = 'active',
  Finished = 'finished',
}
