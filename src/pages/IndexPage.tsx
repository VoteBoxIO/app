import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Footer } from '../components/Footer'
import { HowItWorksLink } from '../components/HowItWorksLink'
import { LogoBlock } from '../components/LogoBlock'
import { ReferralLink } from '../components/ReferralLink'
import SvgFolder from '../svgr/Folder'
import SvgPlus from '../svgr/Plus'
import SvgPolls from '../svgr/Polls'
import SvgVote from '../svgr/Vote'
import { ActionBlockWithIcon } from '../ui/ActionBlock'
import { activeVotingPagePath } from './ActiveVotingPage'
import { myPollsPagePartPath, PollType } from './MyPollsPage'
import { myVotingPagePath } from './MyVotingPage'
import { pollTypePagePath } from './PollTypePage'

export const IndexPage: FC = () => {
  return (
    <IndexPageContainer>
      <LogoBlock />
      <Rhytm>
        <ActionBlockWithIcon
          to={activeVotingPagePath}
          color="purple"
          icon={<SvgVote />}
          title={
            <FormattedMessage
              id="active-voting"
              defaultMessage="Активные голосования"
            />
          }
          subtitle={
            <FormattedMessage
              id="active-voting-subtitle"
              defaultMessage="Посмотрите доступные опросы"
            />
          }
        />
        <ActionBlockWithIcon
          to={myVotingPagePath}
          color="peach"
          icon={<SvgFolder />}
          title={<FormattedMessage id="my-votes" defaultMessage="Мои голоса" />}
          subtitle={
            <FormattedMessage
              id="my-votes-subtitle"
              defaultMessage="История ваших голосований"
            />
          }
        />

        <TwoBlocks>
          <ActionBlockWithIcon
            to={pollTypePagePath}
            color="white"
            icon={<SvgPlus />}
            title={
              <FormattedMessage
                id="create-voting"
                defaultMessage="Создать голосование"
              />
            }
            subtitle={
              <FormattedMessage
                id="create-voting-subtitle"
                defaultMessage="Запустите опрос и вовлеките аудиторию"
              />
            }
          />
          <ActionBlockWithIcon
            to={`${myPollsPagePartPath}/${PollType.Active}`}
            color="white"
            icon={<SvgPolls />}
            title={
              <FormattedMessage id="my-polls" defaultMessage="Мои опросы" />
            }
            subtitle={
              <FormattedMessage
                id="my-polls-subtitle"
                defaultMessage="История ваших голосований"
              />
            }
          />
        </TwoBlocks>

        <HowItWorksLink />

        <ReferralLink />

        <Footer />
      </Rhytm>
    </IndexPageContainer>
  )
}

export const indexPagePath = '/'

const IndexPageContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-gap: 16px;
`

const Rhytm = styled.div`
  display: grid;
  gap: 12px;
  grid-gap: 12px;
`
const TwoBlocks = styled(Rhytm)`
  grid-template-columns: 1fr 1fr;
`
