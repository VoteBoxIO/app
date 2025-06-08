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
  const {
    isClaimable,
    isClaimableLoading,
    isClaimableError,
    retryFetchIsClaimable,
    claimReward,
  } = useClaimReward(vote, jettonMasterAddress)

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

  return (
    <ButtonRegular
      color="purple"
      onClick={claimReward}
      disabled={!isClaimable}
      loading={isClaimableLoading}
    >
      {isClaimable ? (
        <FormattedMessage id="claim-reward" defaultMessage="Забрать выигрыш" />
      ) : (
        <FormattedMessage
          id="claim-reward-distributed"
          defaultMessage="Выигрыш забрали"
        />
      )}
      {' ' + fromNano(vote.amount)}TON
    </ButtonRegular>
  )
}
