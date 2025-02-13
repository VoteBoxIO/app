import { styled } from '@linaria/react'
import React, { FC, useContext, useEffect, useState } from 'react'
import { fetchNftCollectionFromTonCenterApi } from '../../api/fetchNftCollectionApi'
import { AppContext } from '../../App.context'
import { VoteSettings, VotingItem } from '../../components/VoteSettings'
import { Loader } from '../../ui/Loader'
import { Tabs } from '../../ui/Tabs'
import { TitleAndSubtitle } from '../../ui/TitleAndSubtitle'
import { ActiveVotingTab } from './ActiveVotingPage.constants'

export const ActiveVotingPage: FC<{ activeVotingTab: ActiveVotingTab }> = ({
  activeVotingTab,
}) => {
  const { tonApiClient, wallet, contractsAddresses } = useContext(AppContext)
  const [nftItems, setNftItems] = useState<VotingItem[]>([])

  useEffect(() => {
    if (!tonApiClient) {
      return
    }

    const fetchNftItemsFromCollection = async () => {
      try {
        fetchNftCollectionFromTonCenterApi(
          contractsAddresses.nftCollectionContractAddress,
        ).then(setNftItems)
      } catch (error) {
        console.error('Error fetching NFT collection:', error)
      }
    }

    fetchNftItemsFromCollection()
  }, [tonApiClient])

  if (!nftItems.length) {
    return <Loader />
  }

  return (
    <ActiveVotingPageContainer>
      <TitleAndSubtitle
        title="Активные голосования"
        subtitle="Здесь собраны опросы других пользователей. Вы можете принять участие "
      />
      <Tabs
        activeTabId={activeVotingTab}
        tabs={[
          {
            to: activeVotingMoneyPoolPagePath,
            id: ActiveVotingTab.MoneyPool,
            label: 'Денежный пул',
          },
          {
            to: activeVotingAccessToContentPagePath,
            id: ActiveVotingTab.AccessToContent,
            label: 'Доступ к контенту',
          },
        ]}
      />
      {nftItems.map(item => {
        return (
          <VoteSettings
            key={item.index}
            item={item}
            activeVotingTab={activeVotingTab}
          />
        )
      })}
    </ActiveVotingPageContainer>
  )
}

const ActiveVotingPageContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-gap: 16px;
`

export const activeVotingMoneyPoolPagePath = '/active-voting/money-pool'
export const activeVotingAccessToContentPagePath =
  '/active-voting/access-to-content'
