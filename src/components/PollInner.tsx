import { Address, fromNano, OpenedContract } from '@ton/core'
import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { useFetchNftVoteSettings } from '../hooks/useFetchNftVoteSettings'
import { useSendUserVote } from '../hooks/useSendUserVote'
import {
  ACTIVE_PAGE_TO_REWARD_TYPE_MAP,
  PollTypeTab,
} from '../pages/ActivePollsPage.constants'
import { JettonBalanceCustom } from '../commonTypes'
import { LoadingMessage } from '../ui/LoadingMessage'
import { PollBlock } from '../ui/PollBlock'
import { EnterAmountDialog } from './EnterAmountDialog'
import { ClaimRewardButton } from './ClaimRewardButton'

export const PollInner: FC<{
  item: {
    address: Address
    name: string
    index: number
  }
  jettonBalanceList?: JettonBalanceCustom[]
  poolType?: PollTypeTab
  isIntersecting: boolean | undefined
}> = ({
  item,
  // Пока только этот тип поддержан
  poolType = PollTypeTab.MoneyPool,
  isIntersecting,
  jettonBalanceList,
}) => {
  const [dialogOpenForOptionIndex, setDialogOpenForOptionIndex] = useState<
    number | null
  >(null)

  const { address, name } = item

  const {
    votingNftItemContract,
    fetchNftData,
    nftData,
    voteSettingsLoading,
    voteSettingsLoadingError,
  } = useFetchNftVoteSettings(address)

  const { sendUserVote, isValidVotingAmount } = useSendUserVote(
    votingNftItemContract,
    nftData?.recommendedVoteGas,
  )

  useEffect(() => {
    if (
      !nftData &&
      votingNftItemContract &&
      isIntersecting &&
      !voteSettingsLoading &&
      !voteSettingsLoadingError
    ) {
      fetchNftData()
    }
    // Только если есть контракт и изменился isIntersecting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votingNftItemContract, isIntersecting])

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
        expiration={<LoadingMessage />}
        bid={<LoadingMessage />}
        commission={<LoadingMessage />}
        loading={voteSettingsLoading}
        loadingError={voteSettingsLoadingError}
        pollOption={[]}
        onPollItemClick={() => {}}
        onRetryLoading={handleRetryLoading}
        isExpired={false}
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
        bottomElement={jettonBalanceList?.map(jettonBalance => (
          <ClaimRewardButton
            key={`${jettonBalance.pollIndex}${jettonBalance.pollOptionIndex}`}
            jettonBalance={jettonBalance}
          />
        ))}
        pollOption={nftData.pollOptions}
        loading={voteSettingsLoading}
        loadingError={voteSettingsLoadingError}
        onPollItemClick={handlePollItemClick}
        onRetryLoading={handleRetryLoading}
        isExpired={isExpired}
      />
      {dialogOpenForOptionIndex !== null && (
        <EnterAmountDialog
          onSubmit={amount => sendUserVote(dialogOpenForOptionIndex, amount)}
          onClose={() => setDialogOpenForOptionIndex(null)}
          isValidVotingAmount={isValidVotingAmount}
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
