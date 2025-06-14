import { JettonBalance, TonApiClient } from '@ton-api/client'
import { Address } from '@ton/core'
import { useCallback, useEffect, useState } from 'react'

export const useFetchAccountJettonsBalances = (
  tonApiClient: TonApiClient | null,
  wallet: string | null,
) => {
  const [accountJettonsBalances, setAccountJettonsBalances] = useState<
    JettonBalance[] | null
  >(null)

  const fetchAccountJettonsBalances = useCallback(async () => {
    if (!tonApiClient || !wallet) {
      return
    }

    const accountJettonsBalances =
      await tonApiClient.accounts.getAccountJettonsBalances(
        Address.parse(wallet),
      )

    setAccountJettonsBalances(accountJettonsBalances.balances)
  }, [tonApiClient, wallet])

  useEffect(() => {
    let intervalId = 0

    if (tonApiClient && wallet) {
      fetchAccountJettonsBalances()

      intervalId = window.setInterval(() => {
        fetchAccountJettonsBalances()
      }, 30 * 1000)
    }

    return () => {
      window.clearInterval(intervalId)
    }
  }, [tonApiClient, wallet, fetchAccountJettonsBalances])

  return accountJettonsBalances
}
