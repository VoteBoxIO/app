import { fromNano } from '@ton/core'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { JettonBalanceCustom } from '../commonTypes'
import { ButtonRegular } from '../ui/Button'
import { useClaimReward } from '../hooks/useClaimReward'

export const ClaimRewardButton: FC<{
  jettonBalance: JettonBalanceCustom
}> = ({ jettonBalance }) => {
  const { claimAvailable, claimReward } = useClaimReward(jettonBalance)

  return (
    <ButtonRegular
      color="purple"
      onClick={claimReward}
      disabled={!claimAvailable}
    >
      <FormattedMessage id="claim-win" defaultMessage="Забрать выигрыш" />{' '}
      {fromNano(jettonBalance.balance)}TON
    </ButtonRegular>
  )
}
