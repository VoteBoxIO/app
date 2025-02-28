import { toNano } from '@ton/core'
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

export const VOTING_SETTINGS = {
  maxChoices: 5, // MAX_CHOICES
  minDuration: 60 * 60 * 2 * 1000, // 2 hours
  maxDuration: 60 * 60 * 24 * 90 * 1000, // 90 days
  voteCreationFee: toNano('0.06') * 5n + toNano('0.07') + toNano('0.04'), // DEFAULT_VOTING_ITEM_CREATION_FEE calculation
  platformFeeBasisPoints: 200, // 0.2% DEFAULT_PLATFORM_FEE_BASIS_POINTS
  referralFeeBasisPoints: 100, // 0.1% DEFAULT_REFERRAL_FEE_BASIS_POINTS
  referralExpiration: 60 * 60 * 24 * 30, // 30 days DEFAULT_REFERRAL_EXPIRATION
  minVoteAmount: toNano('0.05'), // DEFAULT_MIN_VOTE_AMOUNT
}
