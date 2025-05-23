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
import { activeBoxesMoneyPoolPagePath } from './ActiveBoxesPage'
import { myActiveBoxesPagePath } from './MyBoxesPage'
import { myActiveVotesPagePath } from './MyVotesPage'
import { pollTypePagePath } from './PollTypePage'

export const IndexPage: FC = () => {
  return (
    <IndexPageContainer>
      <Header>
        <LogoBlock />
      </Header>
      <Rhytm>
        <ActionBlockWithIcon
          to={activeBoxesMoneyPoolPagePath}
          color="purple"
          icon={<SvgVote />}
          title={<FormattedMessage id="boxes" defaultMessage="Боксы" />}
          subtitle={
            <FormattedMessage
              id="active-boxes-subtitle"
              defaultMessage="Посмотрите активные голосования"
            />
          }
        />
        <ActionBlockWithIcon
          to={myActiveVotesPagePath}
          color="peach"
          icon={<SvgFolder />}
          title={<FormattedMessage id="my-votes" defaultMessage="Мои воуты" />}
          subtitle={
            <FormattedMessage
              id="votes-history-subtitle"
              defaultMessage="История ваших голосов"
            />
          }
        />

        <TwoBlocks>
          <ActionBlockWithIcon
            to={pollTypePagePath}
            color="white"
            icon={<SvgPlus />}
            title={
              <FormattedMessage id="create-box" defaultMessage="Создать бокс" />
            }
            subtitle={
              <FormattedMessage
                id="create-box-subtitle"
                defaultMessage="Запустите опрос и вовлеките аудиторию"
              />
            }
          />
          <ActionBlockWithIcon
            to={myActiveBoxesPagePath}
            color="white"
            icon={<SvgPolls />}
            title={
              <FormattedMessage id="my-boxes" defaultMessage="Мои боксы" />
            }
            subtitle={
              <FormattedMessage
                id="my-boxes-subtitle"
                defaultMessage="Активные и завершенные опросы"
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
const Header = styled.header``
