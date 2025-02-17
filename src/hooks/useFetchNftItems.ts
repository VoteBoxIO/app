import { useTonAddress } from '@tonconnect/ui-react'
import { useContext, useState, useEffect } from 'react'
import { fetchNftCollectionFromTonCenterApi } from '../api/fetchNftCollectionApi'
import { AppContext } from '../App.context'
import { VotingItem } from '../components/VoteSettings'

export const useFetchNftItems = () => {
  const { contractsAddresses, wallet } = useContext(AppContext)
  const [nftItems, setNftItems] = useState<VotingItem[]>([])
  const [loading, setLoading] = useState(false)
  const currentWalletAddress = useTonAddress()

  useEffect(() => {
    const fetchNftItemsFromCollection = async () => {
      try {
        setLoading(true)
        const items = await fetchNftCollectionFromTonCenterApi(
          contractsAddresses.nftCollection,
          currentWalletAddress,
        )
        setNftItems(items)
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNftItemsFromCollection()
  }, [wallet])

  return { nftItems, loading }
}
