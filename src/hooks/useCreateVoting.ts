import { beginCell, Cell, Dictionary, toNano } from '@ton/core'
import { useContext } from 'react'
import { AppContext } from '../App.context'
import { stringToSnakeCell } from '../functions/onchainMeta'

export function useCreateVoting() {
  const { sender, masterNftCollection } = useContext(AppContext)

  return {
    sendCreateVotingMessage: async () => {
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
            name: stringToSnakeCell('Голосование за лучшую тему'),
            description: stringToSnakeCell(
              'Выберите тему для следующей конференции',
            ),
            image: stringToSnakeCell(
              'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
            ),
            choices: makeChoices(3),
            end_time: BigInt(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7), // 7 days
            creator_basis_points: 500n,
            reward_type: 0n,
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

function makeOptions(number_of_choices: number | bigint): Array<string> {
  let options = []
  for (let i = 0; i < number_of_choices; i++) {
    options.push(`Option ${i}`)
  }
  return options
}

function makeChoices(
  number_of_choices: number | bigint,
): Dictionary<bigint, Cell> {
  let options = makeOptions(number_of_choices)

  let choices: Dictionary<bigint, Cell> = Dictionary.empty()
  let counter = 0

  for (let option of options) {
    let cell = beginCell().storeStringTail(option).endCell()
    choices.set(BigInt(counter), cell)
    counter += 1
  }

  return choices
}
