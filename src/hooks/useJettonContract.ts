import { useEffect, useState } from 'react'
import { Address, fromNano, OpenedContract, toNano } from 'ton-core'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
  VotingNftItemWrappers,
} from 'votebox_wrappers'
import { VoteJettonWallet } from 'votebox_wrappers/dist/VoteJettonWallet'
import { useContactAddresses } from './useContactAddresses'
import { Contract } from '@ton/core'
import { VoteJettonMaster } from 'votebox_wrappers/dist/VoteJettonMaster'
import { MasterNftCollection } from 'votebox_wrappers/dist/MasterNftCollection'

export function useJettonContract() {
  const { client } = useTonClient()
  const { wallet, sender } = useTonConnect()
  const [balance, setBalance] = useState<string | null>()
  const contracts = useContactAddresses()

  const nftCollectionOpenedContract = useAsyncInitialize(async () => {
    if (!client || !wallet || !contracts) return

    try {
      const contract =
        MasterNftCollectionWrappers.MasterNftCollection.fromAddress(
          Address.parse(contracts.masterNftCollectionAddress),
        )

      // @ts-expect-error
      return client.open(contract) as OpenedContract<MasterNftCollection>
    } catch (error) {
      console.error('Error initializing MasterNftCollection:', error)
      return
    }
  }, [client, wallet])

  if (nftCollectionOpenedContract) {
    console.info('voteJettonMaster', nftCollectionOpenedContract)
  }
}
