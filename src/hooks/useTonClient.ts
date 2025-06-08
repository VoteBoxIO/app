import { TonClient } from '@ton/ton'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useTonConnect } from './useTonConnect'
import { CHAIN } from '@tonconnect/ui-react'

export function useTonClient() {
  const { network } = useTonConnect()

  return {
    client: useAsyncInitialize(async () => {
      if (!network) {
        return
      }

      return new TonClient({
        endpoint:
          network === CHAIN.MAINNET
            ? ''
            : 'https://testnet.toncenter.com/api/v2/jsonRPC',
        apiKey: process.env.TON_CLIENT_API_KEY,
      })
    }, [network]),
  }
}
