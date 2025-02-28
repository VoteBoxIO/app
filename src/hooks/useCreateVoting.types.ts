export interface CreateVotingNft {
  name: string
  description: string
  choices: Array<string>
  endTimeInSeconds: bigint
  creatorBasisPoints: bigint
  rewardType: bigint
  hideVotes: boolean
  referral: string | null
  fixedVoteAmount: bigint | null
}
