import { styled } from '@linaria/react'
import React, { FC } from 'react'
import { LogoBlock } from '../components/LogoBlock'
import SvgFolder from '../svgr/Folder'
import SvgVote from '../svgr/Vote'
import { ActionBlock } from '../ui/ActionBlock'
import { activeVotingPagePath } from './ActiveVotingPage'
import { myVotingPagePath } from './MyVotingPage'

export const IndexPage: FC = () => {
  return (
    <IndexPageContainer>
      <LogoBlock />
      <Block>
        <ActionBlock
          to={activeVotingPagePath}
          variant="purple"
          icon={<SvgVote />}
          title="Активные голосования"
          subtitle="Посмотрите доступные опросы"
        />
        <ActionBlock
          to={myVotingPagePath}
          variant="peach"
          icon={<SvgFolder />}
          title="Мои голоса"
          subtitle="История ваших голосований"
        />
      </Block>
    </IndexPageContainer>
  )
}

export const indexPagePath = '/'

const IndexPageContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-gap: 16px;
`

const Block = styled.div`
  display: grid;
  gap: 12px;
  grid-gap: 12px;
`
