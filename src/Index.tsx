import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  const render = (Component: React.FC) => {
    root.render(<Component />)
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
