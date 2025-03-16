import { Address } from '@ton/core'
import { VotingItem } from '../components/PollInner'
// import { TonApiClient } from '@ton-api/client'

export const fetchNftCollectionFromTonCenterApi = async (
  nftCollectionAddress: string,
  walletAddress: string,
  indexes?: number[],
) => {
  let url = `https://testnet.toncenter.com/api/v3/nft/items?collection_address=${nftCollectionAddress}&limit=50&offset=0`

  if (indexes?.length) {
    // Тут подставим '&index=1&index=2&index=...', чтобы запросить список голосований по индексам
    const queryStringPart = indexes.reduce(
      (acc, value) => `${acc}&index=${value}`,
      '',
    )

    url += queryStringPart
  }

  const response = await fetch(url)
  const json: Response = await response.json()

  const addressBook: Record<string, string> = Object.entries(
    json.address_book,
  ).reduce((acc, [key, value]) => ({ ...acc, [value.user_friendly]: key }), {})

  const nftItems: VotingItem[] = json.nft_items
    .sort((a, b) => Number(b.index) - Number(a.index))
    .map(item => {
      const votingItem: VotingItem = {
        name: item.content.name,
        description: item.content.description,
        index: Number(item.index),
        address: Address.parse(item.address),
        ownerAddress: Address.parse(item.owner_address),
        isCreatedByYourWallet: walletAddress
          ? addressBook[walletAddress] === item.owner_address
          : undefined,
        rewardType: Number(item.reward_type) as 0 | 1,
      }

      return votingItem
    })

  return nftItems
}

type Response = {
  address_book: {
    additionalProp1: {
      user_friendly: 'string'
    }
    additionalProp2: {
      user_friendly: 'string'
    }
    additionalProp3: {
      user_friendly: 'string'
    }
  }
  nft_items: [
    {
      address: 'string'
      code_hash: 'string'
      collection: {
        address: 'string'
        code_hash: 'string'
        collection_content: {
          additionalProp1: object
        }
        data_hash: 'string'
        last_transaction_lt: '0'
        next_item_index: 'string'
        owner_address: 'string'
      }
      collection_address: 'string'
      reward_type: 'string'
      content: {
        name: string
        description: string
      }
      data_hash: 'string'
      index: 'string'
      init: true
      last_transaction_lt: '0'
      owner_address: 'string'
    },
  ]
}

// /** Работает не очень корректно. Не всегда отдает все данные */
// export const fetchNftCollectionFromTonAccessOrbApi = async (
//   tonApiClient: TonApiClient,
//   nftCollectionAddress: string,
// ) => {
//   const address = Address.parse(nftCollectionAddress)

//   const json = await tonApiClient.nft.getItemsFromCollection(address, {
//     limit: 50,
//   })

//   const nftItems: VotingItem[] = json.nftItems
//     .sort((a, b) => b.index - a.index)
//     .map(item => {
//       return {
//         name: item.metadata.name,
//         description: item.metadata.description,
//         index: item.index,
//         address: item.address,
//         rewardType: 0, // Пока что всегда 0
//         createdBy: '',
//         isCreatedByYourWallet: false,
//         ownerAddress: item.owner!.address,
//       }
//     })

//   console.log('>>>', json, nftItems)

//   return nftItems
// }
