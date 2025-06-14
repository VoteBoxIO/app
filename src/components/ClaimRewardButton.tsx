import { JettonBalance } from '@ton-api/client'
import { fromNano } from '@ton/core'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useClaimReward } from '../hooks/useClaimReward'
import { ButtonRegular } from '../ui/Button'

export const ClaimRewardButton: FC<{ jettonBalance: JettonBalance }> = ({
  jettonBalance,
}) => {
  const {
    isClaimable,
    isClaimableLoading,
    isClaimableError,
    retryFetchIsClaimable,
    claimReward,
  } = useClaimReward(jettonBalance)

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
        <FormattedMessage id="bet" defaultMessage="Ставка" />
      )}
      {' ' + fromNano(jettonBalance.balance)} TON
    </ButtonRegular>
  )
}
