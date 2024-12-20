import React, { FC, useEffect } from 'react'
import { IndexPage } from './pages/IndexPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

export const App: FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  })

  return (
    // @TODO replace manifestUrl with your own
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/VoteBoxIO/app/refs/heads/main/public/tonconnect-manifest.json">
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </TonConnectUIProvider>
  )
}
