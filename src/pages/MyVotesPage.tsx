import { JettonsBalances } from '@ton-api/client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { AppContext } from '../App.context'
import { Poll } from '../components/Poll'
import { PollsActivityType } from '../constants'
import { parseVotingJettonSymbol } from '../functions/parseVotingJettonSymbol'
import { useFetchJettonData } from '../hooks/useFetchJettonData'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { PollsLayout } from '../layout/PollsLayout'
import { Tabs } from '../ui/Tabs'
import { JettonBalanceCustom } from '../commonTypes'

export const MyVotesPage: FC = () => {
  const { formatMessage } = useIntl()
  const { jettonsBalances, jettonsBalancesLoading } = useFetchJettonData()
  const { fetchNftItemsFromCollection, nftItems, nftItemsLoading } =
    useFetchNftItems()
  const { wallet } = useContext(AppContext)
  const [jettonBalancesList, setJettonBalancesList] = useState<
    JettonBalanceCustom[]
  >([])

  useEffect(() => {
    if (!jettonsBalances) {
      return
    }
    // Получим только валидные жетоны, которые устраивают названию типа Vote1Box2
    const parsedJettonBalances = parseJettonBalances(jettonsBalances)

    if (!parsedJettonBalances.length) {
      return
    }

    setJettonBalancesList(parsedJettonBalances)
  }, [jettonsBalances])

  // Запросим
  useEffect(() => {
    if (jettonBalancesList.length) {
      fetchNftItemsFromCollection([
        ...new Set(jettonBalancesList.map(value => value.pollIndex)),
      ])
    }
  }, [fetchNftItemsFromCollection, jettonBalancesList])

  // console.log({ nftItems, jettonsBalances, jettonBalancesList })

  return (
    <PollsLayout
      loading={jettonsBalancesLoading || nftItemsLoading}
      titleElement={
        <FormattedMessage id="my-votes" defaultMessage="Мои голоса" />
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
      pollsElement={nftItems.map(nftItem => {
        return (
          <Poll
            key={nftItem.index}
            item={nftItem}
            jettonBalanceList={jettonBalancesList.filter(
              item => item.pollIndex === nftItem.index,
            )}
          />
        )
      })}
      showAddWalletStub={!wallet}
    />
  )
}

export const myActiveVotesPagePath = '/my-votes/active'
export const myFinishedVotesPagePath = '/my-votes/finished'

const parseJettonBalances = (jettonsBalances: JettonsBalances) => {
  return jettonsBalances.balances.reduce((acc, item) => {
    try {
      const parseJettonName = parseVotingJettonSymbol(item.jetton.symbol)

      const { pollIndex, pollOptionIndex } = parseJettonName

      const accItem: JettonBalanceCustom = {
        ...item,
        pollIndex,
        pollOptionIndex,
      }

      return [...acc, accItem]
    } catch {
      // Неподходящие Jettons
      return acc
    }
  }, [] as JettonBalanceCustom[])
}
