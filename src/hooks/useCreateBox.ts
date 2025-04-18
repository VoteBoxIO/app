import { toNano } from '@ton/core'
import { useContext } from 'react'
import { AppContext } from '../App.context'
import { stringToSnakeCell } from '../functions/onchainMeta'
import { makeChoicesDictionary } from './useCreateBox.functions'
import { CreateBox } from './useCreateBox.types'

export function useCreateBox() {
  const { sender, boxCollection } = useContext(AppContext)

  return {
    sendCreateBoxMessage: async (box: CreateBox) => {
      const {
        name,
        description,
        choices,
        endTimeInSeconds,
        creatorBasisPoints,
        rewardType,
        // hideVotes,
        // referral,
        // fixedVoteAmount,
      } = box

      try {
        console.log('Отправка сообщения для создания голосования...')

        const result = await boxCollection.send(
          sender,
          {
            // Захардкожено из тестов
            value: toNano('0.5') + toNano('0.73'),
          },
          {
            $$type: 'CreateBoxV0',
            name: stringToSnakeCell(name),
            description: stringToSnakeCell(description),
            image: stringToSnakeCell(IMAGE),
            choices: makeChoicesDictionary(choices),
            end_time: endTimeInSeconds,
            creator_basis_points: creatorBasisPoints,
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

const IMAGE =
  'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY'
