import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAppContext } from '../App.context'
import { Boxes } from '../components/Boxes'
import { BoxActivityType } from '../constants'
import { Tabs } from '../ui/Tabs'

export const MyBoxesPage: FC<{ activeTab: BoxActivityType }> = ({
  activeTab,
}) => {
  const { formatMessage } = useIntl()
  const { wallet } = useAppContext()

  return (
    <Boxes
      status={activeTab}
      owner={wallet!}
      titleElement={
        <FormattedMessage id="my-polls" defaultMessage="Мои опросы" />
      }
      showAddWalletStub
      tabsElement={
        <Tabs
          tabs={[
            {
              to: myActiveBoxesPagePath,
              id: BoxActivityType.Active,
              label: formatMessage({
                id: 'tab-active',
                defaultMessage: 'Активные',
              }),
            },
            {
              to: myFinishedBoxesPagePath,
              id: BoxActivityType.Finished,
              label: formatMessage({
                id: 'tab-finished',
                defaultMessage: 'Завершенные',
              }),
            },
          ]}
          activeTabId={activeTab}
        />
      }
    />
  )
}

export const myActiveBoxesPagePath = '/my-boxes/active'
export const myFinishedBoxesPagePath = '/my-boxes/finished'
