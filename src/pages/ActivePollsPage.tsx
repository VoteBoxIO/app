import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { VoteSettings } from '../components/VoteSettings'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { Loader } from '../ui/Loader'
import { Tabs } from '../ui/Tabs'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { PollTypeTab } from './ActivePollsPage.constants'

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
        title="Активные голосования"
        subtitle="Здесь собраны опросы других пользователей. Вы можете принять участие "
      />
      <Tabs
        activeTabId={activeTab}
        tabs={[
          {
            to: activeVotingMoneyPoolPagePath,
            id: PollTypeTab.MoneyPool,
            label: 'Денежный пул',
          },
          {
            to: activeVotingAccessToContentPagePath,
            id: PollTypeTab.AccessToContent,
            label: 'Доступ к контенту',
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
