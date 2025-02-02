import { beginCell, Cell, Dictionary, toNano } from '@ton/core'
import { useContext } from 'react'
import { AppContext } from '../App.context'
import { stringToSnakeCell } from '../functions/onchainMeta'

export function useCreateVoting() {
  const { sender, masterNftCollection } = useContext(AppContext)

  return {
    sendCreateVotingMessage: async ({
      name,
      description,
      choices,
      endTimeInSeconds,
      creatorBasisPoints,
      rewardType,
      hideVotes,
      referral,
      fixedVoteAmount,
    }: {
      name: string
      description: string
      choices: Array<string>
      endTimeInSeconds: bigint
      creatorBasisPoints: bigint
      rewardType: bigint
      hideVotes: boolean
      referral: string | null
      fixedVoteAmount: bigint | null
    }) => {
      try {
        console.log('Отправка сообщения для создания голосования...')
        // Создание объекта CreateVotingNft
        // Вызов метода send контракта
        const result = await masterNftCollection.send(
          sender,
          {
            value: toNano('0.5') + toNano('0.73'),
          },
          {
            $$type: 'CreateVotingNft',
            name: stringToSnakeCell(name),
            description: stringToSnakeCell(description),
            // Вроде не нужна картинка
            image: stringToSnakeCell(''),
            choices: makeChoicesDictionary(choices),
            // end_time: BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7), // 7 days
            end_time: endTimeInSeconds,
            // creator_basis_points: 500n,
            creator_basis_points: creatorBasisPoints,
            // reward_type: 0n,
            reward_type: rewardType,
            hide_votes: false,
            referral: null,
            fixed_vote_amount: null,
          },
        )
        console.log('Сообщение успешно отправлено!', result)
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error)
      }
    },
  }
}

function makeChoicesDictionary(choices: string[]): Dictionary<bigint, Cell> {
  let choicesDictionary: Dictionary<bigint, Cell> = Dictionary.empty()
  let counter = 0

  for (let option of choices) {
    let cell = beginCell().storeStringTail(option).endCell()
    choicesDictionary.set(BigInt(counter), cell)
    counter += 1
  }

  return choicesDictionary
}
