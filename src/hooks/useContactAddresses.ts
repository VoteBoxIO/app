import { CHAIN } from '@tonconnect/ui-react'
import { useTonConnect } from './useTonConnect'
import { CONTRACT_ADDRESSES } from '../constants'

export const useContactAddresses = () => {
  const { network } = useTonConnect()

  if (!network) {
    /** @TODO Заменить на mainnet */
    return CONTRACT_ADDRESSES[CHAIN.TESTNET]
  }

  if (network === CHAIN.TESTNET) {
    return CONTRACT_ADDRESSES[CHAIN.TESTNET]
  }

  return CONTRACT_ADDRESSES[CHAIN.MAINNET]
}
