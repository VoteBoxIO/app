export const API_CONFIG = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : process.env.API_URL || 'https://api.votebox.io/api',
  endpoints: {
    boxes: {
      getAll: '/boxes',
      getById: (id: string | number) => `/boxes/${id}`,
    },
  },
} as const

export type BoxStatus = 'all' | 'active' | 'finished'

export interface BoxQueryParams {
  status?: BoxStatus
  owner?: string
  page?: number
  limit?: number
}

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
} as const
