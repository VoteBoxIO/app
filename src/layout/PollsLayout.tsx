import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { Loader } from '../ui/Loader'
import { AddWallet } from '../components/AddWallet'

export const PollsLayout: FC<{
  titleElement: ReactNode
  tabsElement: ReactNode
  pollsElement: ReactNode
  loading: boolean
  showAddWalletStub: boolean
}> = ({
  titleElement,
  // tabsElement,
  pollsElement,
  loading,
  showAddWalletStub,
}) => {
  return (
    <PollsLayoutContainer>
      <TitleAndSubtitle title={titleElement} titleFontSize={24} />

      {showAddWalletStub ? (
        <AddWallet showTitle={false} />
      ) : loading ? (
        <Loader />
      ) : (
        <Rhytm>
          {/* {tabsElement} */}
          {pollsElement}
        </Rhytm>
      )}
    </PollsLayoutContainer>
  )
}

const PollsLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 16px;
  grid-gap: 16px;
`
