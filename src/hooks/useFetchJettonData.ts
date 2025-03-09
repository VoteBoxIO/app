import { JettonsBalances } from '@ton-api/client'
import { Address } from '@ton/core'
import { useCallback, useContext, useEffect, useState } from 'react'
import { VoteJettonMasterWrappers } from 'votebox_wrappers'
import { getAccountJettonsBalancesApi } from '../api/getAccountJettonsBalancesApi'
import { AppContext } from '../App.context'
import { useAsyncInitialize } from './useAsyncInitialize'

export const useFetchJettonData = () => {
  const { tonApiClient, wallet, client, contractsAddresses } =
    useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [jettonsBalances, setJettonsBalances] = useState<JettonsBalances>()

  const voteJettonMaster = useAsyncInitialize(async () => {
    if (!client) return

    const address = Address.parse(contractsAddresses.jetton)
    const contract =
      VoteJettonMasterWrappers.VoteJettonMaster.fromAddress(address)

    return client.open(contract)
  }, [client, wallet])

  const fetchJettonsBalances = useCallback(async () => {
    if (
      !voteJettonMaster ||
      !tonApiClient ||
      !wallet ||
      loading ||
      jettonsBalances
    ) {
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
  }, [jettonsBalances, loading, tonApiClient, voteJettonMaster, wallet])

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
