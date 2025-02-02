import { NftItem } from '@ton-api/client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { Dictionary, Cell } from '@ton/core'

export const VoteSettings: FC<{
  item: NftItem
}> = ({ item }) => {
  const { client, wallet } = useContext(AppContext)

  const [voteSettings, setVoteSettings] = useState<{
    $$type: 'VoteSettings'
    choices: Dictionary<bigint, Cell>
    end_time: bigint
    reward_type: bigint
    hide_votes: boolean
    fixed_vote_amount: bigint | null
    min_vote_amount: bigint
  }>()

  // Инициализируем контракт для каждого NftItem(голосования)
  const votingNftItem = useAsyncInitialize(async () => {
    if (!client || !wallet) return

    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(
      item.address,
    )

    return client.open(contract)
  }, [client, wallet])

  useEffect(() => {
    ;(async () => {
      if (votingNftItem) {
        setVoteSettings(await votingNftItem.getVoteSettings())
      }
    })()
  }, [votingNftItem])

  if (!voteSettings) {
    return null
  }

  return (
    <div key={item.index}>
      <img src={item.metadata.image} width={40} height={40} />
      <p>{item.metadata.name}</p>
      <p>{item.metadata.description}</p>
      {parseChoices(voteSettings.choices).map((choice, index) => (
        <p key={index}>{choice}</p>
      ))}
    </div>
  )
}

const parseChoices = (choices: Dictionary<bigint, Cell>): string[] => {
  const parsedChoices: string[] = []

  for (const [index, cell] of choices) {
    const slice = cell.beginParse() // Convert Cell into Slice
    const option = slice.loadStringTail() // Read stored string
    parsedChoices.push(option)
  }

  return parsedChoices
}
