import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { VoteSettings } from '../components/VoteSettings'
import { useFetchNftItems } from '../hooks/useFetchNftItems'
import { Loader } from '../ui/Loader'
import { Rhytm } from '../ui/Rhytm'
import { Tabs } from '../ui/Tabs'
import { TitleAndSubtitle } from '../ui/TitleAndSubtitle'
import { MyPollsTab } from './MyPollsPage.constants'

export const MyPollsPage: FC<{
  activeTab: MyPollsTab
}> = ({ activeTab }) => {
  const { formatMessage } = useIntl()
  const { loading, nftItems } = useFetchNftItems()

  return (
    <MyVotingPageContainer>
      <TitleAndSubtitle
        title={
          <FormattedMessage id="my-polls-title" defaultMessage="Мои опросы" />
        }
        titleFontSize={24}
        subtitle={
          <FormattedMessage
            id="my-polls-subtitle"
            defaultMessage="Здесь собраны ваши опросы. Активные и завершенные."
          />
        }
      />

      <Rhytm style={{ marginTop: 24 }}>
        <Tabs
          tabs={[
            {
              to: myActivePollsPagePath,
              id: MyPollsTab.Active,
              label: formatMessage({
                id: 'tab-active',
                defaultMessage: 'Активные',
              }),
            },
            {
              to: myFinishedPollsPagePath,
              id: MyPollsTab.Finished,
              label: formatMessage({
                id: 'tab-finished',
                defaultMessage: 'Завершенные',
              }),
            },
          ]}
          activeTabId={activeTab}
        />

        {loading ? (
          <Loader />
        ) : (
          nftItems
            // Только созданные текущим активным кошельком
            .filter(item => item.isCreatedByYourWallet)
            .map(item => {
              return <VoteSettings key={item.index} item={item} />
            })
        )}
      </Rhytm>
    </MyVotingPageContainer>
  )
}

const MyVotingPageContainer = styled.div``

export const myActivePollsPagePath = '/my-polls/active'
export const myFinishedPollsPagePath = '/my-polls/finished'
