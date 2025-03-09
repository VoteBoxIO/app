import { JettonsBalances } from '@ton-api/client'
import { Address } from '@ton/core'
import React, { FC, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { VoteSettings } from '../components/VoteSettings'
import { PollsActivityType } from '../constants'
import { parseVotingJettonSymbol } from '../functions/parseVotingJettonSymbol'
import { useFetchJettonData } from '../hooks/useFetchJettonData'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { PollsLayout } from '../layout/PollsLayout'
import { Tabs } from '../ui/Tabs'

export const MyVotesPage: FC = () => {
  const { formatMessage } = useIntl()
  const { jettonsBalances, jettonsBalancesLoading } = useFetchJettonData()
  const { fetchNftItemsFromCollection, nftItems, nftItemsLoading } =
    useFetchNftItems()

  useEffect(() => {
    if (!jettonsBalances) {
      return
    }

    const parsedJettonBalances = parseJettonBalances(jettonsBalances)

    if (!parsedJettonBalances.length) {
      return
    }

    fetchNftItemsFromCollection([
      ...new Set(parsedJettonBalances.map(value => value.pollIndex)),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jettonsBalances])

  return (
    <PollsLayout
      loading={jettonsBalancesLoading || nftItemsLoading}
      titleElement={
        <FormattedMessage id="my-votes" defaultMessage="Мои голоса" />
      }
      subtitleElement={
        <FormattedMessage
          id="my-votes-subtitle"
          defaultMessage="История ваших голосований"
        />
      }
      tabsElement={
        <Tabs
          tabs={[
            {
              to: myActiveVotesPagePath,
              id: PollsActivityType.Active,
              label: formatMessage({
                id: 'tab-active',
                defaultMessage: 'Активные',
              }),
            },
            {
              to: myFinishedVotesPagePath,
              id: PollsActivityType.Finished,
              label: formatMessage({
                id: 'tab-finished',
                defaultMessage: 'Завершенные',
              }),
            },
          ]}
          activeTabId={PollsActivityType.Active}
        />
      }
      pollsElement={nftItems.map(item => {
        return <VoteSettings key={item.index} item={item} />
      })}
    />
  )
}

type JettonBalances = {
  balance: number
  walletAddress: Address
  name: string
  pollIndex: number
  pollOptionIndex: number
}

export const myActiveVotesPagePath = '/my-votes/active'
export const myFinishedVotesPagePath = '/my-votes/finished'

const parseJettonBalances = (jettonsBalances: JettonsBalances) => {
  return jettonsBalances.balances.reduce((acc, item) => {
    try {
      const parseJettonName = parseVotingJettonSymbol(item.jetton.symbol)

      const { pollIndex, pollOptionIndex } = parseJettonName

      const accItem: JettonBalances = {
        balance: Number(item.balance),
        walletAddress: item.walletAddress.address,
        name: item.jetton.name,
        pollIndex,
        pollOptionIndex,
      }

      return [...acc, accItem]
    } catch {
      // Неподходящие Jettons
      return acc
    }
  }, [] as JettonBalances[])
}
