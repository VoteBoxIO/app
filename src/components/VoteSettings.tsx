import { NftItem } from '@ton-api/client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { VotingNftItemWrappers } from 'votebox_wrappers'
import { AppContext } from '../App.context'
import { useAsyncInitialize } from '../hooks/useAsyncInitialize'
import { OpenedContract } from '@ton/core'
import { parseChoices } from './parseChoices'

export const VoteSettings: FC<{
  item: NftItem
}> = ({ item }) => {
  const { client, wallet } = useContext(AppContext)

  const [voteSettings, setVoteSettings] = useState<VoteSettings | null>(null)

  // Инициализируем контракт для каждого NftItem
  const votingNftItem = useAsyncInitialize(async () => {
    if (!client || !wallet) return

    const contract = VotingNftItemWrappers.VotingNftItem.fromAddress(
      item.address,
    )

    return client.open(contract)
  }, [client, wallet])

  useEffect(() => {
    if (votingNftItem) {
      votingNftItem.getVoteSettings().then(setVoteSettings)
    }
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
      <p>
        {new Date(Number(voteSettings.end_time) * 1000).toLocaleDateString()}
      </p>
    </div>
  )
}

type VotingNftItemContract = OpenedContract<VotingNftItemWrappers.VotingNftItem>
type VoteSettings = Awaited<
  ReturnType<VotingNftItemContract['getVoteSettings']>
>

const getTimeLeftInSeconds = (endTime: bigint) => {
  const currentTime = BigInt(Math.floor(Date.now() / 1000))
  return endTime
}
