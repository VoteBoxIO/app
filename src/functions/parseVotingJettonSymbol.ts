/**
 * @str типа Vote4Box0 - означает что голосование под индексом 4 и вариант ответа под индексом 0
 */
export const parseVotingJettonSymbol = (
  str: string,
): {
  pollIndex: number
  pollOptionIndex: number
} => {
  const regex = /^Vote(\d+)Box(\d+)$/
  const match = str.match(regex)

  if (!match) {
    throw new Error('Invalid vote string format')
  }

  return {
    pollIndex: parseInt(match[1], 10),
    pollOptionIndex: parseInt(match[2], 10),
  }
}
