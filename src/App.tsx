import React, { FC, useEffect } from 'react'
import { IndexPage } from './pages/IndexPage'

export const App: FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  return <IndexPage />
}

export default App
