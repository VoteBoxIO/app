import { useState, useEffect } from 'react'
import { useTonConnect } from './useTonConnect'
import { Address, TonClient } from '@ton/ton'

export function useWalletBalance(client: TonClient | undefined) {
  const { wallet } = useTonConnect()
  const [balance, setBalance] = useState<bigint | null>(null)

  useEffect(() => {
    if (!wallet || !client) {
      return
    }

    const fetchBalance = async () => {
      try {
        const walletAddress = wallet.toString()
        const balance = await client.getBalance(Address.parse(walletAddress))
        setBalance(balance)
      } catch {
        throw new Error('Error fetching balance')
      }
    }

    fetchBalance()
  }, [wallet, client])

  return balance
}
