import { Dictionary, Cell, beginCell, toNano } from '@ton/core'

export function makeChoicesDictionary(
  choices: string[],
): Dictionary<bigint, Cell> {
  let choicesDictionary: Dictionary<bigint, Cell> = Dictionary.empty()
  let counter = 0

  for (let option of choices) {
    let cell = beginCell().storeStringTail(option).endCell()
    choicesDictionary.set(BigInt(counter), cell)
    counter += 1
  }

  return choicesDictionary
}
