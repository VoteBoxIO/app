import { useEffect } from 'react'

export const useTelegram = () => {
  const tg = window.Telegram.WebApp

  useEffect(() => {
    tg.ready() // Notify Telegram that your app is ready
    tg.expand() // Expand the mini app
  }, [tg])

  const closeApp = () => {
    tg.close() // Close the mini app
  }

  const sendData = (data: string) => {
    tg.sendData(data) // Send data back to Telegram
  }

  return {
    tg,
    closeApp,
    sendData,
  }
}
