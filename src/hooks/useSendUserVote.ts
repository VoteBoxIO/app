import { OpenedContract, toNano } from '@ton/core'
import { BoxV0Wrappers } from 'votebox_wrappers'
import { useAppContext } from '../App.context'

export const useSendUserVote = (
  openedContact: OpenedContract<BoxV0Wrappers.BoxV0> | undefined,
  recommendedVoteGas: string,
) => {
  const { sender } = useAppContext()

  const sendUserVote = async (index: number, amount: string) => {
    if (!openedContact || !amount) {
      console.error('Failed to send user vote')
      return
    }

    const userVotes = toNano(amount)
    const value = BigInt(userVotes) + BigInt(recommendedVoteGas)
    const queryId = BigInt(Date.now()) // @TODO improve maybe?

    try {
      const result = await openedContact.send(
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
