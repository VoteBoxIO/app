import { Address } from '@ton/core'
import { BoxCollectionV0Wrappers } from 'votebox_wrappers'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useContactAddresses } from './useContactAddresses'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

export function useInitializeContracts() {
  const { client } = useTonClient()
  const { wallet, sender } = useTonConnect()
  const contractsAddresses = useContactAddresses()

  const boxCollection = useAsyncInitialize(async () => {
    if (!client) return

    const address = Address.parse(contractsAddresses.boxCollection)
    const contract =
      BoxCollectionV0Wrappers.BoxCollectionV0.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  if (!client || !boxCollection) {
    return
  }

  return {
    client,
    wallet,
    sender,
    boxCollection,
  }
}
