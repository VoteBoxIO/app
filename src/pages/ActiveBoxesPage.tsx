import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Boxes } from '../components/Boxes'
import { Tabs } from '../ui/Tabs'
import { BoxTypeTab } from './ActiveBoxesPage.constants'

export const ActiveBoxesPage: FC<{ activeTab: BoxTypeTab }> = ({
  activeTab,
}) => {
  return (
    <Boxes
      status="active"
      titleElement={
        <FormattedMessage
          id="active-voting-title"
          defaultMessage="Активные голосования"
        />
      }
      tabsElement={
        // eslint-disable-next-line no-constant-condition
        true ? null : (
          <Tabs
            activeTabId={activeTab}
            tabs={[
              {
                to: activeBoxesMoneyPoolPagePath,
                id: BoxTypeTab.MoneyPool,
                label: (
                  <FormattedMessage
                    id="poll-type-money-pool"
                    defaultMessage="Денежный пул"
                  />
                ),
              },
              {
                to: activeBoxesAccessToContentPagePath,
                id: BoxTypeTab.AccessToContent,
                label: (
                  <FormattedMessage
                    id="poll-type-access-to-content"
                    defaultMessage="Доступ к контенту"
                  />
                ),
              },
            ]}
          />
        )
      }
      showAddWalletStub={false}
    />
  )
}

export const activeBoxesMoneyPoolPagePath = '/active-boxes/money-pool'
export const activeBoxesAccessToContentPagePath =
  '/active-boxes/access-to-content'
