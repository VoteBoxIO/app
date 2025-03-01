import { Address, fromNano, OpenedContract, toNano } from '@ton/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { parseChoices } from '../functions/parseChoices'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import {
  ACTIVE_PAGE_TO_REWARD_TYPE_MAP,
  PollTypeTab,
} from '../pages/ActivePollsPage.constants'
import { LoadingMessage } from '../ui/LoadingMessage'
import { PollBlock, PollOption } from '../ui/PollBlock'
import { EnterAmountDialog } from './EnterAmountDialog'

export const VoteSettingsInner: FC<{
  item: {
    address: Address
    name: string
    description: string
    index: number
  }
  poolType?: PollTypeTab
  isIntersecting: boolean | undefined
}> = ({
  item,
  // Пока только этот тип поддержан
  poolType = PollTypeTab.MoneyPool,
  isIntersecting,
}) => {
  const { address, name, description } = item
  const { sender, client } = useContext(AppContext)

  const [voteSettingsLoading, setVoteSettingsLoading] = useState(false)
  const [voteSettingsLoadingError, setVoteSettingsLoadingError] =
    useState(false)

  const [nftData, setNftData] = useState<{
    pollOptions: PollOption[]
    voteSettings: VoteSettings
    totalVotes: bigint
    rewardDistributionSettings: RewardDistributionSettings
    recommendedVoteGas: bigint
  } | null>(null)

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

  const fetchNftData = async () => {
    if (!votingNftItem) {
      return
    }

    try {
      setVoteSettingsLoading(true)
      setVoteSettingsLoadingError(false)
      const nft = votingNftItem

      const [
        voteSettings,
        totalVotes,
        rewardDistributionSettings,
        recommendedVoteGas,
      ] = await Promise.all([
        nft.getVoteSettings(),
        nft.getTotalVotes(),
        nft.getRewardDistributionSettings(),
        nft.getRecommendedVoteGas(),
      ])

      const choices = parseChoices(voteSettings.choices)
      const choicesWithVoteAmount = await Promise.all(
        choices.map(({ index }) => {
          return votingNftItem.getVoteAmount(index)
        }),
      )

      const largestValue = Math.max(...choicesWithVoteAmount.map(Number))
      const pollOptions: PollOption[] = choicesWithVoteAmount.map(
        (value, index) => {
          const _value = Number(value)
          return {
            name: choices[index].value,
            index: Number(choices[index].index),
            value: fromNano(value),
            progressLineGradient: largestValue === _value,
            progressPercent: _value === 0 ? 0 : (_value / largestValue) * 100,
          }
        },
      )

      setNftData({
        pollOptions,
        voteSettings,
        totalVotes,
        rewardDistributionSettings,
        recommendedVoteGas,
      })
    } catch (error) {
      setVoteSettingsLoadingError(true)
      console.error('Error fetching votingNftItem data', error)
    } finally {
      setVoteSettingsLoading(false)
    }
  }

  useEffect(() => {
    if (
      !nftData &&
      votingNftItem &&
      isIntersecting &&
      !voteSettingsLoading &&
      !voteSettingsLoadingError
    ) {
      fetchNftData()
    }
  }, [votingNftItem, isIntersecting])

  const sendUserVote = async (index: number, amount: string) => {
    if (!votingNftItem) {
      console.error(
        `votingNftItem is ${votingNftItem}. Failed to send user vote`,
      )
      return
    }
    if (!nftData?.recommendedVoteGas) {
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
    const value = userVotes + nftData.recommendedVoteGas
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
  const handleRetryLoading = () => {
    fetchNftData()
  }

  if (
    !nftData?.voteSettings ||
    // Фильтруем по типу вознаграждения, выбранного в качестве активной вкладки
    Number(nftData.voteSettings.reward_type) !==
      ACTIVE_PAGE_TO_REWARD_TYPE_MAP[poolType]
  ) {
    return (
      <PollBlock
        title={name}
        subtitle={description}
        expiration={<LoadingMessage />}
        bid={<LoadingMessage />}
        commission={<LoadingMessage />}
        loading={voteSettingsLoading}
        loadingError={voteSettingsLoadingError}
        pollOption={[]}
        onPollItemClick={() => {}}
        onRetryLoading={handleRetryLoading}
      />
    )
  }

  const { days, hours, isExpired } = getHoursAndDaysLeft(
    Number(nftData.voteSettings.end_time),
  )

  return (
    <>
      <PollBlock
        title={name}
        subtitle={description}
        expiration={
          isExpired ? (
            <FormattedMessage id="status-completed" defaultMessage="Завершен" />
          ) : days ? (
            <FormattedMessage
              id="voteSettings.timeLeft"
              values={{ days, hours }}
              defaultMessage="Еще {days} д и {hours} ч"
            />
          ) : (
            <FormattedMessage
              id="voteSettings.timeLeftHoursOnly"
              values={{ hours }}
              defaultMessage="Еще {hours} ч"
            />
          )
        }
        bid={
          nftData.totalVotes === null ? (
            <LoadingMessage />
          ) : (
            <>{fromNano(nftData.totalVotes)} Ton</>
          )
        }
        commission={
          <FormattedMessage
            id="percent-commission"
            defaultMessage="{commission}% комиссии"
            values={{
              commission: createCommission(nftData.rewardDistributionSettings),
            }}
          />
        }
        pollOption={nftData.pollOptions}
        loading={voteSettingsLoading}
        loadingError={voteSettingsLoadingError}
        onPollItemClick={handlePollItemClick}
        onRetryLoading={handleRetryLoading}
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
