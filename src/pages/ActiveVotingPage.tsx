import { styled } from '@linaria/react'
import { NftItem } from '@ton-api/client'
import { Address } from '@ton/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { AppContext } from '../App.context'

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
        console.log('Account events:', response)
        setNftItems(response.nftItems)
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      }
    }

    fetchNftItemsFromCollection()
  }, [tonApiClient])

  return (
    <ActiveVotingPageContainer>
      {nftItems.map(item => {
        return (
          <div key={item.index}>
            <img src={item.metadata.image} width={40} height={40} />
            <p>{item.metadata.name}</p>
            <p>{item.metadata.description}</p>
          </div>
        )
      })}
    </ActiveVotingPageContainer>
  )
}

const ActiveVotingPageContainer = styled.div``

export const activeVotingPagePath = '/active-voting'
