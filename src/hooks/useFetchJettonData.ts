import { JettonsBalances } from '@ton-api/client'
import { Address } from '@ton/core'
import { useCallback, useContext, useEffect, useState } from 'react'
import { getAccountJettonsBalancesApi } from '../api/getAccountJettonsBalancesApi'
import { AppContext } from '../App.context'

export const useFetchJettonData = () => {
  const { tonApiClient, wallet } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [jettonsBalances, setJettonsBalances] = useState<JettonsBalances>()

  const fetchJettonsBalances = useCallback(async () => {
    if (!tonApiClient || !wallet || loading || jettonsBalances) {
      return
    }

    try {
      setLoading(true)

      const response = await getAccountJettonsBalancesApi(
        tonApiClient,
        Address.parse(wallet),
      )

      setJettonsBalances(response)
    } catch (error) {
      console.error('Failed to fetch jetton data', error)
    } finally {
      setLoading(false)
    }
  }, [jettonsBalances, loading, tonApiClient, wallet])

  useEffect(() => {
    if (!loading || jettonsBalances) {
      fetchJettonsBalances()
    }
  }, [fetchJettonsBalances, jettonsBalances, loading])

  return {
    jettonsBalances,
    jettonsBalancesLoading: loading,
  }
}
