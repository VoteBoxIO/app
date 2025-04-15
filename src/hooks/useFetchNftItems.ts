import { useTonAddress } from '@tonconnect/ui-react'
import { useCallback, useContext, useState } from 'react'
import { fetchNftCollectionFromTonAccessOrbApi } from '../api/fetchNftCollectionApi'
import { AppContext } from '../App.context'
import { VotingItem } from '../components/PollInner'

export const useFetchNftItems = () => {
  const { contractsAddresses, tonApiClient } = useContext(AppContext)
  const [nftItems, setNftItems] = useState<VotingItem[]>([])
  const [loading, setLoading] = useState(false)
  const currentWalletAddress = useTonAddress()

  const fetchNftItemsFromCollection = useCallback(
    async (indexes?: number[]) => {
      if (!tonApiClient) {
        return
      }

      try {
        setLoading(true)
        const items = await fetchNftCollectionFromTonAccessOrbApi(
          tonApiClient,
          contractsAddresses.boxCollection,
        )
        setNftItems(items)
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      } finally {
        setLoading(false)
      }
    },
    [contractsAddresses.boxCollection, tonApiClient],
  )

  return {
    fetchNftItemsFromCollection,
    nftItems,
    nftItemsLoading: loading,
  }
}
