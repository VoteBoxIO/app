import React, { FC, useEffect } from 'react'
import { useFetchJettonData } from '../hooks/useFetchJettonData'

export const MyVotingPage: FC = () => {
  const { fetchJettonData } = useFetchJettonData()

  useEffect(() => {
    fetchJettonData()
  }, [])

  return <React.Fragment>MyVoting</React.Fragment>
}

export const myVotingPagePath = '/my-voting'
