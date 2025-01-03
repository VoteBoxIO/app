import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  })

  const render = (Component: React.FC) => {
    root.render(
      <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/VoteBoxIO/app/refs/heads/main/public/tonconnect-manifest.json">
        <QueryClientProvider client={queryClient}>
          <Component />
        </QueryClientProvider>
      </TonConnectUIProvider>,
    )
  }

  render(App)

  // Включаем HMR
  if (module.hot) {
    module.hot.accept('./App', async () => {
      const { App: NextApp } = await import('./App')
      render(NextApp)
    })
  }
}
