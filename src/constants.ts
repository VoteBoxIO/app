import { toNano } from '@ton/core'
import { CHAIN } from '@tonconnect/ui-react'

export const CONTRACT_ADDRESSES: Record<CHAIN, { boxCollection: string }> = {
  [CHAIN.TESTNET]: {
    boxCollection: 'kQDUmhDUD-1kfs3NJ0PKNfqjTvADSZFjVXFU-p3NckZL4e3M',
  },
  [CHAIN.MAINNET]: {
    boxCollection: '',
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
} as const

export enum BoxActivityType {
  Active = 'active',
  Finished = 'finished',
}
