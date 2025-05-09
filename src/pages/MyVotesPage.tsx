import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAppContext } from '../App.context'
import { Boxes } from '../components/Boxes'
import { BoxActivityType } from '../constants'
import { Tabs } from '../ui/Tabs'

export const MyVotesPage: FC<{ activeTab: BoxActivityType }> = ({
  activeTab,
}) => {
  const { formatMessage } = useIntl()
  const { wallet } = useAppContext()

  return (
    <Boxes
      status={activeTab}
      owner={wallet!}
      votedByMe
      titleElement={
        <FormattedMessage id="my-votes" defaultMessage="Мои голоса" />
      }
      showAddWalletStub
      tabsElement={
        <Tabs
          tabs={[
            {
              to: myActiveVotesPagePath,
              id: BoxActivityType.Active,
              label: formatMessage({
                id: 'tab-active',
                defaultMessage: 'Активные',
              }),
            },
            {
              to: myFinishedVotesPagePath,
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

export const myActiveVotesPagePath = '/my-votes/active'
export const myFinishedVotesPagePath = '/my-votes/finished'
