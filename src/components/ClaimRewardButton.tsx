import { fromNano } from '@ton/core'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Vote } from '../hooks/useBoxes'
import { useClaimReward } from '../hooks/useClaimReward'
import { ButtonRegular } from '../ui/Button'

export const ClaimRewardButton: FC<{
  vote: Vote
  jettonMasterAddress: string
}> = ({ vote, jettonMasterAddress }) => {
  const { claimable, claimReward } = useClaimReward(vote, jettonMasterAddress)

  return (
    <ButtonRegular color="purple" onClick={claimReward} disabled={!claimable}>
      <FormattedMessage id="claim-reward" defaultMessage="Забрать выигрыш" />{' '}
      {fromNano(vote.amount)}TON
    </ButtonRegular>
  )
}
