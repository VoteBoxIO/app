import React, { createContext, FC, PropsWithChildren } from 'react'

const contextValue = {
  language: '' as string,
} as const

type ContextValue = typeof contextValue

export const AppContext = createContext<ContextValue>(contextValue)

export const AppContextProvider: FC<
  PropsWithChildren & { language: string }
> = ({ children, language }) => {
  return (
    <AppContext.Provider value={{ language }}>{children}</AppContext.Provider>
  )
}
