import { Address } from '@ton/core'
import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
} from 'votebox_wrappers'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useContactAddresses } from './useContactAddresses'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

export function useInitializeContracts() {
  const { client } = useTonClient()
  const { wallet, sender } = useTonConnect()
  const contractsAddresses = useContactAddresses()

  const masterNftCollection = useAsyncInitialize(async () => {
    if (!client) return

    const address = Address.parse(contractsAddresses.nftCollection)
    const contract =
      MasterNftCollectionWrappers.MasterNftCollection.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const voteJettonMaster = useAsyncInitialize(async () => {
    if (!client) return

    const address = Address.parse(contractsAddresses.jetton)
    const contract =
      VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  if (!client || !masterNftCollection || !voteJettonMaster) {
    return
  }

  return {
    client,
    wallet,
    sender,
    masterNftCollection,
    voteJettonMaster,
  }
}
