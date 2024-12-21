import { styled } from '@linaria/react'
import { Address } from '@ton/core'
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react'
import React, { FC } from 'react'
import {
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
  VotingNftItemWrappers,
} from 'votebox_wrappers'
import { Welcome } from '../components/Welcome'
import { useTonConnect } from '../hooks/useTonConnect'
import { useTonClient } from '../hooks/useTonClient'
import { useWalletBalance } from '../hooks/useWalletBalance'

console.log({
  MasterNftCollectionWrappers,
  VoteJettonMasterWrappers,
  VoteJettonWalletWrappers,
  VotingNftItemWrappers,
})

export const IndexPage: FC = () => {
  const { network, connected, wallet } = useTonConnect()
  const { client } = useTonClient()
  const balance = useWalletBalance(client)

  return (
    <div>
      <Welcome />
      <div>
        network:{' '}
        {network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A'}
      </div>
      <div>
        wallet:{' '}
        {wallet ? Address.parse(wallet as string).toString() : 'Loading...'}
      </div>
      <div>balance: {balance !== null ? balance.toString() : 'N/A'}</div>
      <div>connected: {String(connected)}</div>
      <TonConnectButtonWrapper>
        <TonConnectButton />
      </TonConnectButtonWrapper>
    </div>
  )
}

const TonConnectButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  right: 0;
`
