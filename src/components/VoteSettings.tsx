import { Address, OpenedContract } from '@ton/core'
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
  const { client, wallet } = useContext(AppContext)

  const [voteSettings, setVoteSettings] = useState<VoteSettings | null>(null)
  const [totalVotes, setTotalVotes] = useState<number>(0)
  const [rewardDistributionSettings, setRewardDistributionSettings] =
    useState<RewardDistributionSettings | null>(null)
  const [pollItems, setPollItems] = useState<PollItem[]>([])

  // Инициализируем контракт для каждого NftItem
  const votingNftItem = useAsyncInitialize(async () => {
    if (!client || !wallet) return
    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(address)
    return client.open(contract)
  }, [client, wallet])

  useEffect(() => {
    if (votingNftItem) {
      votingNftItem.getVoteSettings().then(setVoteSettings)
      votingNftItem.getTotalVotes().then(votes => setTotalVotes(Number(votes)))
      votingNftItem
        .getRewardDistributionSettings()
        .then(setRewardDistributionSettings)
    }
  }, [votingNftItem])

  useEffect(() => {
    if (!voteSettings || !votingNftItem) return

    const parsedChoices = parseChoices(voteSettings.choices)

    setPollItems(
      parsedChoices.map(({ index, value }) => ({
        id: Number(index),
        name: value,
        value: null,
        progressLineGradient: false,
        progressPercent: 0,
      })),
    )
    ;(async () => {
      const choicesWithVoteAmount = await Promise.allSettled(
        parsedChoices.map(({ index, value }) =>
          votingNftItem.getVoteAmount(index),
        ),
      )

      const finalChoices: PollItem[] = choicesWithVoteAmount.map(
        (value, index) => ({
          id: index,
          name: parsedChoices[index].value,
          value: value.status === 'fulfilled' ? Number(value.value) : null,
          progressLineGradient: false,
          progressPercent: 100,
        }),
      )

      setPollItems(finalChoices)
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
      bid={<>{totalVotes} Ton</>}
      commission={<>{createCommission(rewardDistributionSettings)}% комиссии</>}
      pollItems={pollItems}
      onPollItemClick={() => {}}
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
