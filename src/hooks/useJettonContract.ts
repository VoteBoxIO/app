import { Address } from '@ton/core'
import { useEffect, useState } from 'react'
import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VotingNftItemWrappers,
} from 'votebox_wrappers'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useContactAddresses } from './useContactAddresses'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

export function useJettonContract() {
  const { client } = useTonClient()
  const { wallet, sender } = useTonConnect()
  const [balance, setBalance] = useState<string | null>()
  const contracts = useContactAddresses()

  const nftCollection = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.nftCollectionContractAddress)
    const contract =
      MasterNftCollectionWrappers.MasterNftCollection.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const nftItem = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.nftItemContractAddress)
    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const masterJettonContract = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    const address = Address.parse(contracts.jettonContractAddress)
    const contract =
      VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const fetchData = async () => {
    if (!nftCollection || !masterJettonContract || !nftItem) {
      return
    }

    // const response = await nftCollection.getGetCollectionData()
    // const response = await masterJettonContract.getGetJettonData()
    const response = await nftItem.getGetNftData()
    console.info(response)
  }

  useEffect(() => {
    fetchData()
  }, [nftCollection])
}
