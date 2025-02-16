import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton'
import { CHAIN } from '@tonconnect/protocol'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useTonConnect } from './useTonConnect'

export function useTonClient() {
  const { network } = useTonConnect()

  return {
    client: useAsyncInitialize(async () => {
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network
            ? network === CHAIN.MAINNET
              ? 'mainnet'
              : 'testnet'
            : 'testnet' /** @TODO потом заменить на 'mainnet', потому что без кошелька нужно ходить в бой. */,
        }),
      })
    }, [network]),
  }
}
