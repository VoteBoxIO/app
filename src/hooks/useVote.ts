import { OpenedContract, toNano } from '@ton/core'
import { useNavigate } from 'react-router'
import { BoxV0Wrappers } from 'votebox_wrappers'
import { useAppContext } from '../App.context'
import { myActiveVotesPagePath } from '../pages/MyVotesPage'

export const useVote = (
  openedContact: OpenedContract<BoxV0Wrappers.BoxV0> | undefined,
  recommendedVoteGas: string,
) => {
  const { sender } = useAppContext()
  const navigate = useNavigate()

  const sendVote = async (index: number, amount: string) => {
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
      navigate(myActiveVotesPagePath)
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
    sendVote,
    isValidVotingAmount,
  }
}
