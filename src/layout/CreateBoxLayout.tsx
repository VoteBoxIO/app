import { styled } from '@linaria/react'
import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { useAppContext } from '../App.context'
import { AddWallet } from '../components/AddWallet'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'

export const CreateBoxLayout: FC<
  {
    titleElement: ReactNode
    subtitleElement?: ReactNode
    showAddWalletStub: boolean
  } & PropsWithChildren
> = ({ titleElement, subtitleElement, children, showAddWalletStub }) => {
  const { wallet } = useAppContext()

  return (
    <PollsLayoutContainer>
      <TitleAndSubtitle
        title={titleElement}
        subtitle={subtitleElement}
        titleFontSize={24}
      />
      {(() => {
        if (showAddWalletStub && !wallet) {
          return <AddWallet showTitle={false} />
        }

        return (
          <Rhytm>
            {/* {tabsElement} */}
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
