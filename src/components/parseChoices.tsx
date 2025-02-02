import { Dictionary, Cell } from '@ton/core'

export const parseChoices = (choices: Dictionary<bigint, Cell>): string[] => {
  const parsedChoices: string[] = []

  for (const [index, cell] of choices) {
    const slice = cell.beginParse() // Convert Cell into Slice
    const option = slice.loadStringTail() // Read stored string
    parsedChoices.push(option)
  }

  return parsedChoices
}
