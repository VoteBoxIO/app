import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Box } from '../components/Box'
import { useBoxById } from '../hooks/useBoxes'
import { BoxesLayout } from '../layout/BoxesLayout'
import { Loader } from '../ui/Loader'
import { useParams } from 'react-router'

export const SingleBoxPage: FC = () => {
  const { address } = useParams()

  const { data: box, isFetching, refetch, isError } = useBoxById(address!)

  if (isFetching && !box) {
    return <Loader />
  }

  if (!box || isError) {
    return (
      <FormattedMessage id="box-not-found" defaultMessage="Опрос не найден" />
    )
  }

  return (
    <BoxesLayout
      loading={isFetching && !box}
      error={isError}
      onRetryFetch={refetch}
      titleElement={null}
      tabsElement={null}
      showAddWalletStub={false}
    >
      <Box key={box.address} box={box} />
    </BoxesLayout>
  )
}

export const singleBoxPagePath = '/box/:address'
export const singleBoxPageBoxPath = '/box/'
