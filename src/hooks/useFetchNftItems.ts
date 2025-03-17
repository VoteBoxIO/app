import { useTonAddress } from '@tonconnect/ui-react'
import { useCallback, useContext, useState } from 'react'
import { fetchNftCollectionFromTonCenterApi } from '../api/fetchNftCollectionApi'
import { AppContext } from '../App.context'
import { VotingItem } from '../components/PollInner'

export const useFetchNftItems = () => {
  const { contractsAddresses } = useContext(AppContext)
  const [nftItems, setNftItems] = useState<VotingItem[]>([])
  const [loading, setLoading] = useState(false)
  const currentWalletAddress = useTonAddress()

  const fetchNftItemsFromCollection = useCallback(
    async (indexes?: number[]) => {
      try {
        setLoading(true)
        const items = await fetchNftCollectionFromTonCenterApi(
          contractsAddresses.nftCollection,
          currentWalletAddress,
          indexes,
        )
        setNftItems(items)
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      } finally {
        setLoading(false)
      }
    },
    [contractsAddresses.nftCollection, currentWalletAddress],
  )

  return {
    fetchNftItemsFromCollection,
    nftItems,
    nftItemsLoading: loading,
  }
}
