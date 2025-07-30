import { useEffect, useRef } from 'react'
import { useTonWallet } from '@tonconnect/ui-react'
import { createUserApi } from '../api/createUserApi'
import { parseStartParam } from '../functions/parseStartParam'

export function useWalletConnection(): void {
  const wallet = useTonWallet()
  const previousWalletRef = useRef<string | null>(null)

  useEffect(() => {
    const walletAddress = wallet?.account.address

    if (walletAddress && walletAddress !== previousWalletRef.current) {
      const tgUserId =
        window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString()

      // Only create user if we're inside Telegram (tgUserId exists)
      if (tgUserId) {
        const startParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param
        const { ref } = parseStartParam(startParam)

        createUserApi({
          walletAddress,
          tgUserId,
          referredByKey: ref ?? undefined,
        })
          .then(data => {
            alert(
              `User created/updated successfully, ${walletAddress}, ${tgUserId}, ${ref}`,
            )
            console.log('User created/updated:', data)
          })
          .catch(error => {
            console.error('Error creating user:', error)
          })
      }

      previousWalletRef.current = walletAddress
    } else if (!walletAddress) {
      previousWalletRef.current = null
    }
  }, [wallet])
}
