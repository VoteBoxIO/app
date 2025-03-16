import { toNano } from '@ton/core'
import { useContext, useEffect, useState } from 'react'
import {
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
} from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { JettonBalanceCustom } from '../commonTypes'
import { useAsyncInitialize } from './useAsyncInitialize'

export const useClaimReward = (jettonBalance: JettonBalanceCustom) => {
  const { client, sender } = useContext(AppContext)
  const [available, setAvailable] = useState(false)

  const voteJettonMasterContract = useAsyncInitialize(async () => {
    if (!client) return
    const contract = VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(
      jettonBalance.jetton.address,
    )
    return client.open(contract)
  }, [client])

  const voteJettonWalletContract = useAsyncInitialize(async () => {
    if (!client) return
    const contract = VoteJettonWalletWrappers.VoteJettonWallet.fromAddress(
      jettonBalance.walletAddress.address,
    )
    return client.open(contract)
  }, [client])

  useEffect(() => {
    if (!voteJettonMasterContract) return
    ;(async () => {
      if (
        jettonBalance.balance &&
        (await voteJettonMasterContract.getClaimble())
      ) {
        setAvailable(true)
      }
    })()
  }, [jettonBalance.balance, voteJettonMasterContract])

  return {
    claimAvailable: available,
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
