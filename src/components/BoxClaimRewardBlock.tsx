import { FC } from 'react'
import { useAppContext } from '../App.context'
import React from 'react'
import { ClaimRewardButton } from './ClaimRewardButton'

export const BoxClaimRewardBlock: FC<{ boxIndex: number }> = ({ boxIndex }) => {
  const { accountJettonsBalances } = useAppContext()

  if (!accountJettonsBalances?.length) {
    // Жеттонов вообще нет
    return null
  }

  const boxAccountJettonsBalances = accountJettonsBalances.filter(
    accountJettonsBalance => {
      return (
        // Еще не забрали монеты с жеттона
        accountJettonsBalance.balance > 0n &&
        // Сейчас только по symbol можем понять, к какому боксу и его варианту принадлежит жеттон
        accountJettonsBalance.jetton.symbol.startsWith(`Vote${boxIndex}`)
      )
    },
  )

  if (!boxAccountJettonsBalances.length) {
    // Жеттонов по этому боксу нет
    return null
  }

  // Есть жеттоны по этому боксу
  return boxAccountJettonsBalances.map(jettonBalance => (
    <ClaimRewardButton
      key={jettonBalance.jetton.address.toRawString()}
      jettonBalance={jettonBalance}
    />
  ))
}
