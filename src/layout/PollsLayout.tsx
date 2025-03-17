import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren, ReactNode, useContext } from 'react'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { Loader } from '../ui/Loader'
import { AddWallet } from '../components/AddWallet'
import { AppContext } from '../App.context'

export const PollsLayout: FC<
  {
    titleElement: ReactNode
    subtitleElement?: ReactNode
    tabsElement: ReactNode
    loading: boolean
    showAddWalletStub: boolean
  } & PropsWithChildren
> = ({
  titleElement,
  subtitleElement,
  // tabsElement,
  children,
  loading,
  showAddWalletStub,
}) => {
  const { wallet } = useContext(AppContext)

  return (
    <PollsLayoutContainer>
      <TitleAndSubtitle
        title={titleElement}
        subtitle={subtitleElement}
        titleFontSize={24}
      />

      {showAddWalletStub && !wallet ? (
        <AddWallet showTitle={false} />
      ) : loading ? (
        <Loader />
      ) : (
        <Rhytm>
          {/* {tabsElement} */}
          {children}
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
