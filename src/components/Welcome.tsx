import { styled } from '@linaria/react'
import React, { FC } from 'react'
import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
  VotingNftItemWrappers,
} from 'votebox_wrappers'

console.log({
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
  VotingNftItemWrappers,
})

export const Welcome: FC = () => {
  return <Title>VoteBoxIO</Title>
}

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  text-align: center;
`
