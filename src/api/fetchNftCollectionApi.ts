import { Address } from '@ton/core'
import { VotingItem } from '../components/VoteSettings'
import { TonApiClient } from '@ton-api/client'

export const fetchNftCollectionFromTonCenterApi = async (
  nftCollectionAddress: string,
) => {
  const response = await fetch(
    `https://testnet.toncenter.com/api/v3/nft/items?collection_address=${nftCollectionAddress}&limit=50&offset=0`,
  )
  const json = await response.json()

  console.log('json', json)

  const nftItems: VotingItem[] = json.nft_items
    .sort((a: any, b: any) => b.index - a.index)
    .map((item: any) => {
      const votingItem: VotingItem = {
        name: item.content.name,
        description: item.content.description,
        index: Number(item.index),
        address: Address.parse(item.address),
        rewardType: Number(item.reward_type) as 0 | 1,
      }

      return votingItem
    })

  return nftItems
}

/** Работает не очень корректно. Не всегда отдает все данные */
export const fetchNftCollectionFromTonAccessOrbApi = async (
  tonApiClient: TonApiClient,
  nftCollectionAddress: string,
) => {
  const address = Address.parse(nftCollectionAddress)

  const response = await tonApiClient.nft.getItemsFromCollection(address, {
    limit: 50,
  })

  const nftItems: VotingItem[] = response.nftItems
    .sort((a, b) => b.index - a.index)
    .map(item => {
      return {
        name: item.metadata.name,
        description: item.metadata.description,
        index: item.index,
        address: item.address,
        rewardType: 0, // Пока что всегда 0
      }
    })

  return nftItems
}
