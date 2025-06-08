import { fromNano } from '@ton/core'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Vote } from '../hooks/useBoxes'
import { useClaimReward } from '../hooks/useClaimReward'
import { ButtonRegular } from '../ui/Button'
import { LoadingMessage } from '../ui/LoadingMessage'

export const ClaimRewardButton: FC<{
  vote: Vote
  jettonMasterAddress: string
}> = ({ vote, jettonMasterAddress }) => {
  const {
    isClaimable,
    isClaimableLoading,
    isClaimableError,
    retryFetchIsClaimable,
    claimReward,
  } = useClaimReward(vote, jettonMasterAddress)

  if (isClaimableLoading) {
    return (
      <ButtonRegular color="purple">
        <LoadingMessage />
      </ButtonRegular>
    )
  }

  if (isClaimableError) {
    return (
      <ButtonRegular color="purple" onClick={retryFetchIsClaimable}>
        <FormattedMessage
          id="error-loading"
          defaultMessage="Ошибка загрузки. Повторить"
        />
      </ButtonRegular>
    )
  }

  if (isClaimable) {
    return (
      <ButtonRegular
        color="purple"
        onClick={claimReward}
        disabled={!isClaimable}
      >
        <FormattedMessage id="claim-reward" defaultMessage="Забрать выигрыш" />{' '}
        {fromNano(vote.amount)}TON
      </ButtonRegular>
    )
  }

  return null
}
