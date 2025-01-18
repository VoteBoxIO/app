import React, { createContext, FC, PropsWithChildren } from 'react'
import { useInitializeContracts } from './hooks/useInitializeContracts'
import { OpenedContract, Sender } from '@ton/core'
import { TonClient } from '@ton/ton'
import { MasterNftCollection } from 'votebox_wrappers/dist/MasterNftCollection'
import { VoteJettonMaster } from 'votebox_wrappers/dist/VoteJettonMaster'
import { VotingNftItem } from 'votebox_wrappers/dist/VotingNftItem'

const contextValue = {
  language: '' as string,
} as const

type ContextValue = typeof contextValue &
  (ReturnType<typeof useInitializeContracts> | undefined)

export const AppContext = createContext<ContextValue>({
  language: '' as string,
  client: undefined as unknown as TonClient,
  voteJettonMaster: undefined as unknown as OpenedContract<VoteJettonMaster>,
  masterNftCollection:
    undefined as unknown as OpenedContract<MasterNftCollection>,
  votingNftItem: undefined as unknown as OpenedContract<VotingNftItem>,
  sender: undefined as unknown as Sender,
  wallet: null as string | null,
})

export const AppContextProvider: FC<
  PropsWithChildren & { language: string }
> = ({ children, language }) => {
  const contractsData = useInitializeContracts()!

  return (
    <AppContext.Provider value={{ language, ...contractsData }}>
      {children}
    </AppContext.Provider>
  )
}
