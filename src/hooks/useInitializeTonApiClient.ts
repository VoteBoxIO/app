import { TonApiClient } from '@ton-api/client'
import { CHAIN } from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { useTonConnect } from './useTonConnect'

export const useInitializeTonApiClient = () => {
  const { network } = useTonConnect()
  const [tonApiClient, setTonApiClient] = useState<TonApiClient | null>(null)

  useEffect(() => {
    if (!network) {
      return
    }

    const tonApiClient = new TonApiClient({
      baseUrl:
        network === CHAIN.TESTNET
          ? 'https://testnet.tonapi.io'
          : 'https://tonapi.io',
      apiKey: process.env.TON_API_KEY,
    })

    setTonApiClient(tonApiClient)
  }, [network])

  return tonApiClient
}
