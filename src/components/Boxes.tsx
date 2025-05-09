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
  showAddWalletStub: boolean
}> = ({ titleElement, tabsElement, status, owner, showAddWalletStub }) => {
  const {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    isFetchingNextPage,
    isError,
  } = useBoxes({ status, owner })

  return (
    <BoxesLayout
      loading={isFetching && !isFetchingNextPage}
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
