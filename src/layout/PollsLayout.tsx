import { styled } from '@linaria/react'
import React, { FC, ReactNode } from 'react'
import { Rhytm } from '../ui/Rhytm'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { Loader } from '../ui/Loader'

export const PollsLayout: FC<{
  titleElement: ReactNode
  subtitleElement: ReactNode
  tabsElement: ReactNode
  pollsElement: ReactNode
  loading: boolean
}> = ({
  titleElement,
  subtitleElement,
  // tabsElement,
  pollsElement,
  loading,
}) => {
  return (
    <PollsLayoutContainer>
      <TitleAndSubtitle
        title={titleElement}
        titleFontSize={24}
        subtitle={subtitleElement}
      />

      {loading ? (
        <Loader />
      ) : (
        <Rhytm style={{ marginTop: 24 }}>
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
