import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { useAppContext } from '../App.context'
import { AddWallet } from '../components/AddWallet'
import { FetchingError } from '../components/FetchingError'
import { Loader } from '../ui/Loader'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'

export const BoxesLayout: FC<
  {
    titleElement: ReactNode
    subtitleElement?: ReactNode
    tabsElement: ReactNode
    loading: boolean
    error: boolean
    showAddWalletStub: boolean
    onRetryFetch: VoidFunction
  } & PropsWithChildren
> = ({
  titleElement,
  subtitleElement,
  tabsElement,
  children,
  loading,
  error,
  showAddWalletStub,
  onRetryFetch,
}) => {
  const { wallet } = useAppContext()

  return (
    <PollsLayoutContainer>
      <TitleAndSubtitle
        title={titleElement}
        subtitle={subtitleElement}
        titleFontSize={24}
      />
      {(() => {
        if (error) {
          return <FetchingError onRetry={onRetryFetch} />
        }

        if (showAddWalletStub && !wallet) {
          return <AddWallet showTitle={false} />
        }

        if (loading) {
          return <Loader />
        }

        return (
          <Rhytm>
            {tabsElement}
            {children}
          </Rhytm>
        )
      })()}
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
