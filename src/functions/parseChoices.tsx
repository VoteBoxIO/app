import { Dictionary, Cell } from '@ton/core'

export const parseChoices = (
  choices: Dictionary<bigint, Cell>,
): { index: bigint; value: string }[] => {
  const parsedChoices = []

  for (const [index, cell] of choices) {
    const slice = cell.beginParse() // Convert Cell into Slice
    const option = slice.loadStringTail() // Read stored string
    parsedChoices.push({ value: option, index })
  }

  return parsedChoices
}
