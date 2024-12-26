import { useState, useEffect } from 'react'
import { Address, TonClient } from 'ton'
import { useTonConnect } from './useTonConnect'

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
      } catch (error) {
        throw new Error('Error fetching balance')
      }
    }

    fetchBalance()
  }, [wallet, client])

  return balance
}
