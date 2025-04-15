import React, { FC, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Poll } from '../components/Poll'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { PollsLayout } from '../layout/PollsLayout'
import { Tabs } from '../ui/Tabs'
import { PollTypeTab } from './ActivePollsPage.constants'

export const ActivePollsPage: FC<{ activeTab: PollTypeTab }> = ({
  activeTab,
}) => {
  const { fetchNftItemsFromCollection, nftItemsLoading, nftItems } =
    useFetchNftItems()

  useEffect(() => {
    fetchNftItemsFromCollection()
  }, [fetchNftItemsFromCollection])

  return (
    <PollsLayout
      loading={nftItemsLoading}
      titleElement={
        <FormattedMessage
          id="active-voting-title"
          defaultMessage="Активные голосования"
        />
      }
      tabsElement={
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
      }
      showAddWalletStub={false}
    >
      {nftItems.map(item => {
        return <Poll key={item.index} item={item} poolType={activeTab} />
      })}
    </PollsLayout>
  )
}

export const activeVotingMoneyPoolPagePath = '/active-voting/money-pool'
export const activeVotingAccessToContentPagePath =
  '/active-voting/access-to-content'
