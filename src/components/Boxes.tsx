import React, { FC, ReactNode } from 'react'
import { Box } from '../components/Box'
import { useBoxes } from '../hooks/useBoxes'
import { BoxesLayout } from '../layout/BoxesLayout'
import { ScrollLoader } from '../system/ScrollLoader'
import { BoxStatus } from '../api/config/api'

export const Boxes: FC<{
  titleElement: ReactNode
  tabsElement: ReactNode
  status: BoxStatus
  owner?: string
  votedByMe?: boolean
  showAddWalletStub: boolean
}> = ({
  titleElement,
  tabsElement,
  status,
  owner,
  votedByMe,
  showAddWalletStub,
}) => {
  const {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    isFetchingNextPage,
    isError,
  } = useBoxes({ status, owner, votedByMe })

  return (
    <BoxesLayout
      loading={isFetching && !isFetchingNextPage && !data}
      error={isError}
      onRetryFetch={refetch}
      titleElement={titleElement}
      tabsElement={tabsElement}
      showAddWalletStub={showAddWalletStub}
    >
      <ScrollLoader loading={isFetching} onShouldLoad={fetchNextPage}>
        {data?.pages.map(page => {
          return page.data.map(box => {
            return <Box key={box.address} box={box} />
          })
        })}
      </ScrollLoader>
    </BoxesLayout>
  )
}
