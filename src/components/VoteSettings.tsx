import { Address, fromNano, OpenedContract, toNano } from '@ton/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import {
  ACTIVE_PAGE_TO_REWARD_TYPE_MAP,
  ActiveVotingTab,
} from '../pages/ActiveVotingPage/ActiveVotingPage.constants'
import { PollBlock, PollItem } from '../ui/PollBlock'
import { parseChoices } from './parseChoices'

export const VoteSettings: FC<{
  item: {
    address: Address
    name: string
    description: string
    index: number
  }
  activeVotingTab: ActiveVotingTab
}> = ({ item, activeVotingTab }) => {
  const { address, name, description } = item
  const { sender, client, wallet } = useContext(AppContext)

  const [voteSettings, setVoteSettings] = useState<VoteSettings | null>(null)
  const [totalVotes, setTotalVotes] = useState<bigint | null>(null)
  const [rewardDistributionSettings, setRewardDistributionSettings] =
    useState<RewardDistributionSettings | null>(null)
  const [pollItems, setPollItems] = useState<PollItem[]>([])
  const [recommendedVoteGas, setRecommendedVoteGas] = useState<bigint | null>(
    null,
  )

  // Инициализируем контракт для каждого NftItem
  const votingNftItem = useAsyncInitialize(async () => {
    if (!client || !wallet) return
    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(address)
    return client.open(contract)
  }, [client, wallet])

  useEffect(() => {
    if (votingNftItem) {
      try {
        votingNftItem.getVoteSettings().then(setVoteSettings)
        votingNftItem.getTotalVotes().then(setTotalVotes)
        votingNftItem
          .getRewardDistributionSettings()
          .then(setRewardDistributionSettings)
        votingNftItem.getRecommendedVoteGas().then(setRecommendedVoteGas)
      } catch (error) {
        console.error('Error fetching votingNftItem data', error)
      }
    }
  }, [votingNftItem])

  const sendUserVote = async (index: number) => {
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

    const userVotes = toNano('0.05')
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
    sendUserVote(index)
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
      const choicesWithVoteAmount = await Promise.allSettled(
        choices.map(({ index }) => votingNftItem.getVoteAmount(index)),
      )

      const _choices: PollItem[] = choicesWithVoteAmount.map(
        (value, index) => ({
          name: choices[index].value,
          index: Number(choices[index].index),
          value: value.status === 'fulfilled' ? fromNano(value.value) : null,
          progressLineGradient: false,
          progressPercent: 100,
        }),
      )

      setPollItems(_choices)
    })()
  }, [voteSettings, votingNftItem])

  if (
    !voteSettings ||
    // Фильтруем по типу вознаграждения, выбранного в качестве активной вкладки
    Number(voteSettings.reward_type) !==
      ACTIVE_PAGE_TO_REWARD_TYPE_MAP[activeVotingTab]
  ) {
    return null
  }

  const { days, hours } = getHoursAndDaysLeft(Number(voteSettings.end_time))

  return (
    <PollBlock
      title={name}
      subtitle={description}
      expiration={
        <FormattedMessage
          id="voteSettings.timeLeft"
          values={{ days, hours }}
          defaultMessage="Еще {days} д и {hours} ч"
        />
      }
      bid={totalVotes === null ? '' : <>{Number(totalVotes)} Ton</>}
      commission={<>{createCommission(rewardDistributionSettings)}% комиссии</>}
      pollItems={pollItems}
      onPollItemClick={handlePollItemClick}
    />
  )
}

const createCommission = (
  rewardDistributionSettings?: RewardDistributionSettings | null,
) => {
  if (!rewardDistributionSettings) {
    return 0
  }

  return Number(
    rewardDistributionSettings.creator_basis_points +
      rewardDistributionSettings.platform_basis_points,
  )
}
const getHoursAndDaysLeft = (endTimeInSeconds: number) => {
  const now = Date.now()
  const endTime = endTimeInSeconds * 1000
  const diff = endTime - now
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return { days, hours }
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
}
