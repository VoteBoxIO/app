import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { App } from './App'
import { loadLocaleData } from './Index.functions'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  })

  const bootstrapApplication = async (Component: React.FC) => {
    const messages = await loadLocaleData('en')

    root.render(
      <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/VoteBoxIO/app/refs/heads/main/public/tonconnect-manifest.json">
        <QueryClientProvider client={queryClient}>
          <IntlProvider messages={messages} locale="ru" defaultLocale="ru">
            <Component />
          </IntlProvider>
        </QueryClientProvider>
      </TonConnectUIProvider>,
    )
  }

  bootstrapApplication(App)

  // Включаем HMR
  if (module.hot) {
    module.hot.accept('./App', async () => {
      const { App: NextApp } = await import('./App')
      bootstrapApplication(NextApp)
    })
  }
}
