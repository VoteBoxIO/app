const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://testnet.votebox.io/api'
    // return 'http://localhost:3000/api'
  }
  return 'https://testnet.votebox.io/api'
}

export const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  endpoints: {
    boxes: {
      getAll: '/boxes',
      getById: (id: string | number) => `/boxes/${id}`,
    },
    users: {
      create: '/users',
    },
  },
} as const

export type BoxStatus = 'all' | 'active' | 'finished'

export interface BoxQueryParams {
  status?: BoxStatus
  owner?: string
  page?: number
  limit?: number
  votedByMe?: boolean
}

export const DEFAULT_PAGINATION = { page: 1, limit: 10 } as const
