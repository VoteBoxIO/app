import { styled } from '@linaria/react'
import { NftItem } from '@ton-api/client'
import { Address } from '@ton/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { AppContext } from '../App.context'
import { VoteSettings } from '../components/VoteSettings'

export const ActiveVotingPage: FC = () => {
  const { tonApiClient, contractsAddresses } = useContext(AppContext)
  const [nftItems, setNftItems] = useState<NftItem[]>([])

  useEffect(() => {
    if (!tonApiClient) {
      return
    }

    const fetchNftItemsFromCollection = async () => {
      const address = Address.parse(
        contractsAddresses.nftCollectionContractAddress,
      )

      try {
        const response = await tonApiClient.nft.getItemsFromCollection(
          address,
          { limit: 50 },
        )
        setNftItems(response.nftItems.sort((a, b) => b.index - a.index))
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      }
    }

    fetchNftItemsFromCollection()
  }, [tonApiClient])

  return (
    <ActiveVotingPageContainer>
      {nftItems.map(item => {
        return <VoteSettings key={item.index} item={item} />
      })}
    </ActiveVotingPageContainer>
  )
}

const ActiveVotingPageContainer = styled.div``

export const activeVotingPagePath = '/active-voting'
