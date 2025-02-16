import { CHAIN } from '@tonconnect/ui-react'

export const CONTRACT_ADDRESSES: Record<
  CHAIN,
  {
    nftCollection: string
    nftItem: string
    jetton: string
  }
> = {
  [CHAIN.TESTNET]: {
    nftCollection: 'kQBW9oel-GrDWF0KcprXNwryZyflwAa2oWG2zHisDgsQPgik',
    nftItem: 'kQAzcQjs6pb5TA4gnIKBF4gombhMAOWll7uaRv1b-HGzCU4x',
    jetton: 'kQA7zB_qTISgvZYS7eqrLbxHpdXeeGV8y4YhEz78KVoI_tKD',
  },
  [CHAIN.MAINNET]: {
    nftCollection: '',
    nftItem: '',
    jetton: '',
  },
} as const
