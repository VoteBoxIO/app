import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { VoteSettings } from '../components/VoteSettings'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { Loader } from '../ui/Loader'
import { Tabs } from '../ui/Tabs'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { PollTypeTab } from './ActivePollsPage.constants'
import { FormattedMessage } from 'react-intl'

export const ActivePollsPage: FC<{ activeTab: PollTypeTab }> = ({
  activeTab,
}) => {
  const { loading, nftItems } = useFetchNftItems()

  if (loading) {
    return <Loader />
  }

  return (
    <ActiveVotingPageContainer>
      <TitleAndSubtitle
        title={
          <FormattedMessage
            id="active-voting-title"
            defaultMessage="Активные голосования"
          />
        }
        subtitle={
          <FormattedMessage
            id="active-voting-subtitle"
            defaultMessage="Здесь собраны опросы других пользователей. Вы можете принять участие"
          />
        }
      />
      <Tabs
        activeTabId={activeTab}
        tabs={[
          {
            to: activeVotingMoneyPoolPagePath,
            id: PollTypeTab.MoneyPool,
            label: (
              <FormattedMessage
                id="poll-type-money-pool"
                defaultMessage="Денежный пул"
              />
            ),
          },
          {
            to: activeVotingAccessToContentPagePath,
            id: PollTypeTab.AccessToContent,
            label: (
              <FormattedMessage
                id="poll-type-access-to-content"
                defaultMessage="Доступ к контенту"
              />
            ),
          },
        ]}
      />
      {nftItems.map(item => {
        return (
          <VoteSettings key={item.index} item={item} poolType={activeTab} />
        )
      })}
    </ActiveVotingPageContainer>
  )
}

const ActiveVotingPageContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-gap: 16px;
`

export const activeVotingMoneyPoolPagePath = '/active-voting/money-pool'
export const activeVotingAccessToContentPagePath =
  '/active-voting/access-to-content'
