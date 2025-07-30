import { API_CONFIG } from './config/api'

export interface CreateUserDto {
  walletAddress: string
  tgUserId?: string
  referredByKey?: string
}

export interface CreateUserResponse {
  id: string
  walletAddress: string
  tgUserId?: string
  referralKey: string
  referredBy?: string
  createdAt: string
  updatedAt: string
}

export async function createUserApi(
  userData: CreateUserDto,
): Promise<CreateUserResponse> {
  const response = await fetch(`${API_CONFIG.baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to create user: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
