import React, { createContext, FC, PropsWithChildren } from 'react'
import { useInitializeContracts } from './hooks/useInitializeContracts'
import { OpenedContract, Sender } from '@ton/core'
import { TonClient } from '@ton/ton'
import { MasterNftCollection } from 'votebox_wrappers/dist/MasterNftCollection'
import { VoteJettonMaster } from 'votebox_wrappers/dist/VoteJettonMaster'
import { useInitializeTonApiClient } from './hooks/useInitializeTonApiClient'
import { TonApiClient } from '@ton-api/client'
import { useContactAddresses } from './hooks/useContactAddresses'

const contextValue = {
  language: '' as string,
  client: undefined as unknown as TonClient,
  voteJettonMaster: undefined as unknown as OpenedContract<VoteJettonMaster>,
  masterNftCollection:
    undefined as unknown as OpenedContract<MasterNftCollection>,
  sender: undefined as unknown as Sender,
  wallet: null as string | null,
  tonApiClient: null as null | TonApiClient,
  contractsAddresses: undefined as unknown as ReturnType<
    typeof useContactAddresses
  >,
  basePath: '/' as string,
} as const

export const AppContext = createContext<typeof contextValue>(contextValue)

export const AppContextProvider: FC<
  PropsWithChildren & { language: string }
> = ({ children, language }) => {
  const contractsData = useInitializeContracts()!
  const tonApiClient = useInitializeTonApiClient()
  const contractsAddresses = useContactAddresses()
  const basePath = `/${process.env.WEBPACK_PUBLIC_PATH}` || '/'

  return (
    <AppContext.Provider
      value={{
        language,
        ...contractsData,
        tonApiClient,
        contractsAddresses,
        basePath,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
