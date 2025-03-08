import { Address, fromNano, OpenedContract } from '@ton/core'
import { useContext, useState } from 'react'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { parseChoices } from '../functions/parseChoices'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { PollOption } from '../ui/PollBlock'

export const useFetchNftDataFromBlockchain = (votingNftAddress: Address) => {
  const { client } = useContext(AppContext)

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

  // Инициализируем контракт для каждого NftItem
  const votingNftItemContract = useAsyncInitialize(async () => {
    if (client) {
      const contract =
        VotingNftItemWrappers.VotingNftItem.fromAddress(votingNftAddress)
      return client.open(contract)
    }
  }, [client])

  const fetchNftData = async () => {
    if (!votingNftItemContract) {
      return
    }

    try {
      setVoteSettingsLoading(true)
      setVoteSettingsLoadingError(false)
      const nft = votingNftItemContract

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
          return votingNftItemContract.getVoteAmount(index)
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

  return {
    votingNftItemContract,
    fetchNftData,
    voteSettingsLoading,
    voteSettingsLoadingError,
    nftData,
  }
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
