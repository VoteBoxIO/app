import { TonApiClient } from '@ton-api/client'
import { OpenedContract, Sender } from '@ton/core'
import { TonClient } from '@ton/ton'
import React, { createContext, FC, PropsWithChildren } from 'react'
import { BoxCollectionV0 } from 'votebox_wrappers/dist/BoxCollectionV0'
import { useContactAddresses } from './hooks/useContactAddresses'
import { useInitializeContracts } from './hooks/useInitializeContracts'
import { useInitializeTonApiClient } from './hooks/useInitializeTonApiClient'

const contextValue = {
  language: '' as string,
  client: undefined as unknown as TonClient,
  boxCollection: undefined as unknown as OpenedContract<BoxCollectionV0>,
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
  const basePath = process.env.PUBLIC_PATH || '/'

  return (
    <AppContext.Provider
      value={{
        language,
        client: contractsData?.client,
        wallet: contractsData?.wallet,
        sender: contractsData?.sender,
        boxCollection: contractsData?.boxCollection,
        tonApiClient,
        contractsAddresses,
        basePath,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
