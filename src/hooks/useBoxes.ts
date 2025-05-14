import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import {
  API_CONFIG,
  BoxQueryParams,
  BoxStatus,
  DEFAULT_PAGINATION,
} from '../api/config/api'

export const useBoxes = (params: BoxQueryParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['boxes', params],
    queryFn: ({ pageParam = 1 }) => fetchBoxes({ ...params, page: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.meta.totalPages <= lastPage.meta.page) {
        return undefined
      }
      return lastPage.meta.page + 1
    },
    initialPageParam: 1,
    refetchInterval,
  })
}

export const useBoxById = (id: string) => {
  return useQuery({
    queryKey: ['box', id],
    queryFn: () => fetchBoxById(id),
    refetchInterval,
  })
}

const refetchInterval = 1000 * 5 // Refetch every 5 seconds

const fetchBoxes = async (
  params: BoxQueryParams = {},
): Promise<BoxesResponse> => {
  const {
    status = 'all',
    owner,
    page = DEFAULT_PAGINATION.page,
    limit = DEFAULT_PAGINATION.limit,
    votedByMe,
  } = params

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (status !== 'all') {
    queryParams.append('status', status)
  }

  if (owner) {
    queryParams.append('owner', owner)
  }

  if (votedByMe) {
    queryParams.append('votedByMe', votedByMe.toString())
  }

  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.boxes.getAll}?${queryParams.toString()}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch boxes')
  }

  return response.json()
}

const fetchBoxById = async (id: string | number): Promise<Box> => {
  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.boxes.getById(id)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch box')
  }

  return response.json()
}

export type Vote = {
  id: number
  transactionHash: string
  user: string
  amount: string
  choiceId: number
  blockchainTimestamp: string
  createdAt: string
  updatedAt: string
  jettonWalletAddress: string
}

export type BoxChoice = {
  id: number
  boxAddress: string
  jettonMasterAddress: string
  choice: string
  choiceIndex: number
  votesAmount: string
  createdAt: string
  updatedAt: string
  votes: Vote[]
}

export type Box = {
  address: string
  transactionHash: string
  masterCollectionAddress: string
  itemIndex: string
  owner: string
  createBlockchainTimestamp: string
  updateBlockchainTimestamp: string
  question: string
  boxStatus: number
  winner: string | null
  voteRewardType: number
  hideVotes: boolean
  fixedVoteAmount: string | null
  minVoteAmount: string
  platformBasisPoints: string
  creatorBasisPoints: string
  referralFeeBasisPoints: string | null
  referralAddress: string | null
  deadline: string
  recommendedVoteGas: string
  createdAt: string
  updatedAt: string
  boxChoices: BoxChoice[]
}

interface BoxesResponse {
  data: Box[]
  meta: {
    limit: number
    page: number
    status: BoxStatus
    total: number
    totalPages: number
  }
}
