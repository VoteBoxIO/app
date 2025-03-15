import React, { FC, useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { VoteJettonMasterWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { JettonBalanceCustom } from '../commonTypes'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { ButtonRegular } from '../ui/Button'

export const ClaimRewardButton: FC<{
  jettonBalance: JettonBalanceCustom
}> = ({ jettonBalance }) => {
  const { client } = useContext(AppContext)

  useEffect(() => {
    console.log(
      'jettonBalance >>>',
      jettonBalance,
      jettonBalance.jetton.address.toString(),
    )
  }, [jettonBalance])

  const voteJettonMaster = useAsyncInitialize(async () => {
    if (!client) return

    const contract = VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(
      jettonBalance.jetton.address,
    )

    return client.open(contract)
  }, [client])

  useEffect(() => {
    if (!voteJettonMaster) return
    ;(async () => {
      const result = await voteJettonMaster.getWinner()
      console.log({ result })
    })()
  }, [voteJettonMaster])

  return (
    <ButtonRegular color="purple">
      <FormattedMessage id="claim-win" defaultMessage="Забрать выигрыш" />
    </ButtonRegular>
  )
}
