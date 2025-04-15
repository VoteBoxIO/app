import { OpenedContract, toNano } from '@ton/core'
import { useContext } from 'react'
import { BoxV0Wrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'

export const useSendUserVote = (
  votingNftItemContract: OpenedContract<BoxV0Wrappers.BoxV0> | undefined,
  recommendedVoteGas: bigint | undefined,
) => {
  const { sender } = useContext(AppContext)

  const sendUserVote = async (index: number, amount: string) => {
    if (!votingNftItemContract || !recommendedVoteGas || !amount) {
      console.error('Failed to send user vote')
      return
    }

    const userVotes = toNano(amount)
    const value = userVotes + recommendedVoteGas
    const queryId = 1000n

    try {
      const result = await votingNftItemContract.send(
        sender,
        { value },
        {
          $$type: 'Vote',
          choice: BigInt(index),
          votes: userVotes,
          query_id: queryId,
        },
      )
      console.log(result)
    } catch (error) {
      console.error('Error sending user vote', error)
    }
  }

  const isValidVotingAmount = (amount: string) => {
    if (Number(amount) > 0) {
      return true
    }

    return false
  }

  return {
    sendUserVote,
    isValidVotingAmount,
  }
}
