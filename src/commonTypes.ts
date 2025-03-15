import { JettonBalance } from '@ton-api/client'

export type JettonBalanceCustom = JettonBalance & {
  pollIndex: number
  pollOptionIndex: number
}
