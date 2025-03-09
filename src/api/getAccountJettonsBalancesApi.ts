import { TonApiClient } from '@ton-api/client'
import { Address } from '@ton/core'

export const getAccountJettonsBalancesApi = async (
  tonApiClient: TonApiClient,
  walletAddress: Address,
) => {
  const json =
    await tonApiClient.accounts.getAccountJettonsBalances(walletAddress)

  return json
}
