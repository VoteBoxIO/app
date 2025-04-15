import { Cell, Dictionary, beginCell } from '@ton/core'

export function makeChoicesDictionary(
  choices: string[],
): Dictionary<bigint, Cell> {
  const choicesDictionary: Dictionary<bigint, Cell> = Dictionary.empty()
  let counter = 0

  for (const option of choices) {
    const cell = beginCell().storeStringTail(option).endCell()
    choicesDictionary.set(BigInt(counter), cell)
    counter += 1
  }

  return choicesDictionary
}
