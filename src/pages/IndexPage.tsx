import React, { FC } from 'react'
import { Welcome } from '../components/Welcome'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonConnect } from '../hooks/useTonConnect'
import { styled } from '@linaria/react'

export const IndexPage: FC = () => {
  const { network } = useTonConnect()

  return (
    <div>
      <p>network: {network}</p>
      <TonConnectButtonWrapper>
        <TonConnectButton />
      </TonConnectButtonWrapper>
      <Welcome />
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
