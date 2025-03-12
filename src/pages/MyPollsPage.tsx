import React, { FC, useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { VoteSettings } from '../components/VoteSettings'
import { PollsActivityType } from '../constants'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { PollsLayout } from '../layout/PollsLayout'
import { Tabs } from '../ui/Tabs'
import { AppContext } from '../App.context'

export const MyPollsPage: FC<{
  activeTab: PollsActivityType
}> = ({ activeTab }) => {
  const { wallet } = useContext(AppContext)
  const { formatMessage } = useIntl()
  const { fetchNftItemsFromCollection, nftItemsLoading, nftItems } =
    useFetchNftItems()

  useEffect(() => {
    fetchNftItemsFromCollection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PollsLayout
      loading={nftItemsLoading}
      titleElement={
        <FormattedMessage id="my-polls-title" defaultMessage="Мои опросы" />
      }
      tabsElement={
        <Tabs
          tabs={[
            {
              to: myActivePollsPagePath,
              id: PollsActivityType.Active,
              label: formatMessage({
                id: 'tab-active',
                defaultMessage: 'Активные',
              }),
            },
            {
              to: myFinishedPollsPagePath,
              id: PollsActivityType.Finished,
              label: formatMessage({
                id: 'tab-finished',
                defaultMessage: 'Завершенные',
              }),
            },
          ]}
          activeTabId={activeTab}
        />
      }
      pollsElement={nftItems
        // Только созданные текущим активным кошельком
        .filter(item => item.isCreatedByYourWallet)
        .map(item => {
          return <VoteSettings key={item.index} item={item} />
        })}
      showAddWalletStub={!wallet}
    />
  )
}

export const myActivePollsPagePath = '/my-polls/active'
export const myFinishedPollsPagePath = '/my-polls/finished'
