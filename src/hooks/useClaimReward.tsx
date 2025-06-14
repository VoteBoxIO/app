import { JettonBalance } from '@ton-api/client'
import { toNano } from '@ton/core'
import { useCallback, useEffect, useState } from 'react'
import {
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
} from 'votebox_wrappers'
import { useAppContext } from '../App.context'
import { useAsyncInitialize } from './useAsyncInitialize'

export const useClaimReward = (jettonBalance: JettonBalance) => {
  const { client, sender } = useAppContext()
  const [isClaimable, setIsClaimable] = useState<boolean | null>(null)
  const [isClaimableLoading, setIsClaimableLoading] = useState<boolean>(false)
  const [isClaimableError, setIsClaimableError] = useState<boolean>(false)

  const voteJettonMasterContract = useAsyncInitialize(async () => {
    if (!client) {
      return
    }
    const contract = VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(
      jettonBalance.jetton.address,
    )
    return client.open(contract)
  }, [client])

  const voteJettonWalletContract = useAsyncInitialize(async () => {
    if (!client) {
      return
    }
    const contract = VoteJettonWalletWrappers.VoteJettonWallet.fromAddress(
      jettonBalance.walletAddress.address,
    )
    return client.open(contract)
  }, [client])

  const fetchIsClaimable = useCallback(async () => {
    if (!voteJettonMasterContract) {
      return
    }

    try {
      setIsClaimableError(false)
      setIsClaimableLoading(true)
      const claimable = await voteJettonMasterContract.getClaimble()
      setIsClaimable(claimable)
    } catch (error) {
      setIsClaimableError(true)
      console.error(
        'Requesting voteJettonMasterContract.getClaimble is failed',
        error,
      )
    } finally {
      setIsClaimableLoading(false)
    }
  }, [voteJettonMasterContract])

  useEffect(() => {
    if (!voteJettonMasterContract) {
      return
    }
    fetchIsClaimable()
  }, [fetchIsClaimable, voteJettonMasterContract])

  return {
    isClaimable,
    isClaimableLoading,
    isClaimableError,
    claimReward: async () => {
      if (!voteJettonWalletContract) {
        throw new Error('voteJettonWalletContract is not available')
      }
      try {
        await voteJettonWalletContract.send(
          sender,
          { value: toNano('0.01') },
          { $$type: 'ClaimUserRewardRequest', query_id: 1n },
        )
      } catch (error) {
        throw new Error(error as string)
      }
    },
    retryFetchIsClaimable: fetchIsClaimable,
  }
}
