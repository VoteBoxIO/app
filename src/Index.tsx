// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React, { FC } from 'react'
import ReactDOM from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { App } from './App'
import { loadLocaleData } from './Index.functions'
import { AppContextProvider } from './App.context'
import { detectBrowserLanguage } from './functions/detectBrowserLanguage'
import './styles/reset.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  /** Пока не нужно */
  // const queryClient = new QueryClient({
  //   defaultOptions: { queries: { refetchOnWindowFocus: false } },
  // })

  const bootstrapApplication = async (Component: FC) => {
    const language = detectBrowserLanguage()
    const messages = await loadLocaleData(language)

    root.render(
      <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/VoteBoxIO/app/refs/heads/main/public/tonconnect-manifest.json">
        {/* <QueryClientProvider client={queryClient}> */}
        <AppContextProvider language={language}>
          <IntlProvider
            messages={messages}
            locale={language}
            defaultLocale="ru"
          >
            <Component />
          </IntlProvider>
        </AppContextProvider>
        {/* </QueryClientProvider> */}
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
