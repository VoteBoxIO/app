import { Address } from '@ton/core'
import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VotingNftItemWrappers,
} from 'votebox_wrappers'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useContactAddresses } from './useContactAddresses'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

export function useInitializeContracts() {
  const { client } = useTonClient()
  const { wallet, sender } = useTonConnect()
  const contracts = useContactAddresses()

  const masterNftCollection = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.nftCollectionContractAddress)
    const contract =
      MasterNftCollectionWrappers.MasterNftCollection.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const votingNftItem = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.nftItemContractAddress)
    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const voteJettonMaster = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.jettonContractAddress)
    const contract =
      VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  if (
    !client ||
    !sender ||
    !masterNftCollection ||
    !votingNftItem ||
    !voteJettonMaster
  ) {
    return
  }

  return {
    client,
    wallet,
    sender,
    masterNftCollection,
    votingNftItem,
    voteJettonMaster,
  }
}
