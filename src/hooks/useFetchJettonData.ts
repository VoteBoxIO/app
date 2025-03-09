import { Address } from '@ton/core'
import { VoteJettonMasterWrappers } from 'votebox_wrappers'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useContactAddresses } from './useContactAddresses'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

export const useFetchJettonData = () => {
  const { client } = useTonClient()
  const { wallet } = useTonConnect()
  const contractsAddresses = useContactAddresses()

  const voteJettonMaster = useAsyncInitialize(async () => {
    if (!client) return

    const address = Address.parse(contractsAddresses.jetton)
    const contract =
      VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const fetchJettonData = async () => {
    if (!voteJettonMaster) {
      return
    }

    const result = await voteJettonMaster.getUnclaimedVotes()
    result
  }

  return {
    fetchJettonData,
  }
}
