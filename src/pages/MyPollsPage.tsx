import React, { FC, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { VoteSettings } from '../components/VoteSettings'
import { PollsActivityType } from '../constants'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { PollsLayout } from '../layout/PollsLayout'
import { Tabs } from '../ui/Tabs'

export const MyPollsPage: FC<{
  activeTab: PollsActivityType
}> = ({ activeTab }) => {
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
      subtitleElement={
        <FormattedMessage
          id="my-polls-subtitle"
          defaultMessage="Здесь собраны ваши опросы. Активные и завершенные."
        />
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
    />
  )
}

export const myActivePollsPagePath = '/my-polls/active'
export const myFinishedPollsPagePath = '/my-polls/finished'
