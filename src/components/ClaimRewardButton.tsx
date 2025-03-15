import React, { FC, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
} from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { JettonBalanceCustom } from '../commonTypes'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { ButtonRegular } from '../ui/Button'
import { fromNano, toNano } from '@ton/core'

export const ClaimRewardButton: FC<{
  jettonBalance: JettonBalanceCustom
}> = ({ jettonBalance }) => {
  const { client, sender } = useContext(AppContext)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {}, [jettonBalance])

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
        setEnabled(true)
      }
    })()
  }, [jettonBalance.balance, voteJettonMasterContract])

  const handleClaimReward = async () => {
    if (!voteJettonWalletContract) {
      throw new Error('voteJettonWalletContract is not available')
    }

    const result = await voteJettonWalletContract.send(
      sender,
      { value: toNano('0.01') },
      {
        $$type: 'ClaimUserRewardRequest',
        query_id: 1n,
      },
    )

    console.log({ result })
  }

  return (
    <ButtonRegular
      color="purple"
      onClick={handleClaimReward}
      disabled={!enabled}
    >
      <FormattedMessage id="claim-win" defaultMessage="Забрать выигрыш" />{' '}
      {fromNano(jettonBalance.balance)}TON
    </ButtonRegular>
  )
}
