import { Address, toNano } from '@ton/core'
import { useEffect, useState } from 'react'
import {
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
} from 'votebox_wrappers'
import { useAppContext } from '../App.context'
import { useAsyncInitialize } from './useAsyncInitialize'
import { Vote } from './useBoxes'

export const useClaimReward = (vote: Vote, jettonMasterAddress: string) => {
  const { client, sender } = useAppContext()
  const [claimable, setClaimable] = useState<boolean | null>(null)

  const voteJettonMasterContract = useAsyncInitialize(async () => {
    if (!client) {
      return
    }
    const contract = VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(
      Address.parse(jettonMasterAddress),
    )
    const openedContract = client.open(contract)

    return openedContract
  }, [client])

  const voteJettonWalletContract = useAsyncInitialize(async () => {
    if (!client) {
      return
    }
    const contract = VoteJettonWalletWrappers.VoteJettonWallet.fromAddress(
      Address.parse(vote.jettonWalletAddress),
    )
    const openedContract = client.open(contract)

    return openedContract
  }, [client])

  useEffect(() => {
    if (!voteJettonMasterContract) {
      return
    }
    ;(async () => {
      const claimable = await voteJettonMasterContract.getClaimble()
      setClaimable(claimable)
    })()
  }, [voteJettonMasterContract])

  return {
    claimable,
    claimReward: async () => {
      if (!voteJettonWalletContract) {
        throw new Error('voteJettonWalletContract is not available')
      }
      try {
        await voteJettonWalletContract.send(
          sender,
          { value: toNano('0.01') },
          {
            $$type: 'ClaimUserRewardRequest',
            query_id: 1n,
          },
        )
      } catch (error) {
        throw new Error(error as string)
      }
    },
  }
}
