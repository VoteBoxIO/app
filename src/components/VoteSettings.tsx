import { Address, fromNano, OpenedContract, toNano } from '@ton/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import {
  ACTIVE_PAGE_TO_REWARD_TYPE_MAP,
  PollTypeTab,
} from '../pages/ActivePollsPage.constants'
import { PollBlock, PollItem } from '../ui/PollBlock'
import { parseChoices } from './parseChoices'
import { EnterAmountDialog } from './EnterAmountDialog'

export const VoteSettings: FC<{
  item: {
    address: Address
    name: string
    description: string
    index: number
  }
  poolType?: PollTypeTab
}> = ({
  item,
  // Пока только этот тип поддержан
  poolType = PollTypeTab.MoneyPool,
}) => {
  const { address, name, description } = item
  const { sender, client } = useContext(AppContext)

  const [voteSettings, setVoteSettings] = useState<VoteSettings | null>(null)
  const [totalVotes, setTotalVotes] = useState<bigint | null>(null)
  const [rewardDistributionSettings, setRewardDistributionSettings] =
    useState<RewardDistributionSettings | null>(null)
  const [pollItems, setPollItems] = useState<PollItem[]>([])
  const [recommendedVoteGas, setRecommendedVoteGas] = useState<bigint | null>(
    null,
  )

  const [dialogOpenForOptionIndex, setDialogOpenForOptionIndex] = useState<
    number | null
  >(null)

  // Инициализируем контракт для каждого NftItem
  const votingNftItem = useAsyncInitialize(async () => {
    if (!client) {
      return
    }
    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(address)
    return client.open(contract)
  }, [client])

  useEffect(() => {
    if (!votingNftItem) {
      return
    }

    try {
      const nft = votingNftItem
      nft.getVoteSettings().then(setVoteSettings)
      nft.getTotalVotes().then(setTotalVotes)
      nft.getRewardDistributionSettings().then(setRewardDistributionSettings)
      nft.getRecommendedVoteGas().then(setRecommendedVoteGas)
    } catch (error) {
      console.error('Error fetching votingNftItem data', error)
    }
  }, [votingNftItem])

  const sendUserVote = async (index: number, amount: string) => {
    if (!votingNftItem) {
      console.error(
        `votingNftItem is ${votingNftItem}. Failed to send user vote`,
      )
      return
    }
    if (!recommendedVoteGas) {
      console.error(
        `recommendedVoteGas is ${votingNftItem}. Failed to send user vote`,
      )
      return
    }
    if (!amount) {
      console.error(`amount is: ${amount}`)
      return
    }

    const userVotes = toNano(amount)
    const value = userVotes + recommendedVoteGas
    const queryId = 1000n

    try {
      const result = await votingNftItem.send(
        sender,
        {
          value,
        },
        {
          $$type: 'Vote',
          choice: BigInt(index),
          votes: userVotes,
          query_id: queryId,
        },
      )
      console.log(result)
    } catch (error) {
      console.error('Error sending user vote', error)
    }
  }

  const handlePollItemClick = (index: number) => {
    setDialogOpenForOptionIndex(index)
  }

  useEffect(() => {
    if (!voteSettings || !votingNftItem) return

    const choices = parseChoices(voteSettings.choices)

    setPollItems(
      choices.map(({ value }) => ({
        name: value,
        value: null,
        progressLineGradient: false,
        progressPercent: 0,
        index: 0,
      })),
    )
    ;(async () => {
      const choicesWithVoteAmount = await Promise.all(
        choices.map(({ index }) => votingNftItem.getVoteAmount(index)),
      )

      const largestValue = Math.max(...choicesWithVoteAmount.map(Number))

      const _choices: PollItem[] = choicesWithVoteAmount.map((value, index) => {
        const _value = Number(value)

        return {
          name: choices[index].value,
          index: Number(choices[index].index),
          value: fromNano(value),
          progressLineGradient: largestValue === _value,
          progressPercent: _value === 0 ? 0 : (_value / largestValue) * 100,
        }
      })

      setPollItems(_choices)
    })()
  }, [voteSettings, votingNftItem])

  if (
    !voteSettings ||
    // Фильтруем по типу вознаграждения, выбранного в качестве активной вкладки
    Number(voteSettings.reward_type) !==
      ACTIVE_PAGE_TO_REWARD_TYPE_MAP[poolType]
  ) {
    return (
      <PollBlock
        title={name}
        subtitle={description}
        expiration="Loading"
        bid="Loading"
        commission="Loading"
        pollItems={[]}
        onPollItemClick={() => {}}
      />
    )
  }

  const { days, hours, isExpired } = getHoursAndDaysLeft(
    Number(voteSettings.end_time),
  )

  return (
    <>
      <PollBlock
        title={name}
        subtitle={description}
        expiration={
          isExpired ? (
            'Завершен'
          ) : (
            <FormattedMessage
              id="voteSettings.timeLeft"
              values={{ days, hours }}
              defaultMessage="Еще {days} д и {hours} ч"
            />
          )
        }
        bid={totalVotes === null ? 'Loading' : <>{fromNano(totalVotes)} Ton</>}
        commission={
          <>{createCommission(rewardDistributionSettings)}% комиссии</>
        }
        pollItems={pollItems}
        onPollItemClick={handlePollItemClick}
      />
      {dialogOpenForOptionIndex !== null && (
        <EnterAmountDialog
          onSubmit={amount => sendUserVote(dialogOpenForOptionIndex, amount)}
          onClose={() => setDialogOpenForOptionIndex(null)}
        />
      )}
    </>
  )
}

const createCommission = (
  rewardDistributionSettings?: RewardDistributionSettings | null,
) => {
  if (!rewardDistributionSettings) {
    return 0
  }

  return (
    Number(
      rewardDistributionSettings.creator_basis_points +
        rewardDistributionSettings.platform_basis_points,
    ) / 100
  )
}
const getHoursAndDaysLeft = (endTimeInSeconds: number) => {
  const now = Date.now()
  const endTime = endTimeInSeconds * 1000
  const diff = endTime - now
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return { days, hours, isExpired: now >= endTime }
}

type VotingNftItemContract = OpenedContract<VotingNftItemWrappers.VotingNftItem>
type VoteSettings = Awaited<
  ReturnType<VotingNftItemContract['getVoteSettings']>
>
type RewardDistributionSettings = Awaited<
  ReturnType<VotingNftItemContract['getRewardDistributionSettings']>
>
export type VotingItem = {
  address: Address
  name: string
  description: string
  index: number
  rewardType: 0 | 1
  ownerAddress: Address
  isCreatedByYourWallet: boolean | undefined
}
