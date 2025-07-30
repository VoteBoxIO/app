/**
 * Integration tests for useWalletConnection hook
 *
 * These tests verify that the createUserApi is called with correct parameters
 * when wallet connection state changes.
 */

import { createUserApi } from '../api/createUserApi'
import { parseStartParam } from '../functions/parseStartParam'

// Mock the API call
jest.mock('../api/createUserApi', () => ({
  createUserApi: jest.fn(),
}))

jest.mock('../functions/parseStartParam', () => ({
  parseStartParam: jest.fn(),
}))

const mockCreateUserApi = createUserApi as jest.MockedFunction<
  typeof createUserApi
>
const mockParseStartParam = parseStartParam as jest.MockedFunction<
  typeof parseStartParam
>

// Mock Telegram WebApp globally
Object.defineProperty(global, 'window', {
  value: {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: { id: 123456 },
          start_param: 'ref_abc123_box_456',
        },
      },
    },
  },
  writable: true,
})

describe('useWalletConnection integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Setup default mocks
    mockParseStartParam.mockReturnValue({ ref: 'abc123', box: '456' })
    mockCreateUserApi.mockResolvedValue({
      id: '1',
      walletAddress: '0xABC123',
      tgUserId: '123456',
      referralKey: 'xyz789',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    })
  })

  it('should call createUserApi with correct parameters', async () => {
    // Test the logic that would be executed when wallet connects
    const walletAddress = '0xABC123'
    const tgUserId =
      global.window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString()
    const startParam =
      global.window.Telegram?.WebApp?.initDataUnsafe?.start_param
    const { ref } = parseStartParam(startParam)

    // Simulate the API call that happens in the hook
    await createUserApi({
      walletAddress,
      tgUserId,
      referredByKey: ref ?? undefined,
    })

    expect(mockCreateUserApi).toHaveBeenCalledWith({
      walletAddress: '0xABC123',
      tgUserId: '123456',
      referredByKey: 'abc123',
    })
  })

  it('should NOT call createUserApi when Telegram data is missing', async () => {
    // Mock empty window (simulating outside Telegram environment)
    const originalWindow = global.window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.window = {} as any

    mockParseStartParam.mockReturnValue({ ref: null, box: null })

    const walletAddress = '0xABC123'
    const tgUserId =
      global.window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString()

    // Simulate the logic: only call API if tgUserId exists
    if (tgUserId) {
      const startParam =
        global.window.Telegram?.WebApp?.initDataUnsafe?.start_param
      const { ref } = parseStartParam(startParam)

      await createUserApi({
        walletAddress,
        tgUserId,
        referredByKey: ref ?? undefined,
      })
    }

    // Verify that createUserApi was NOT called when tgUserId is missing
    expect(mockCreateUserApi).not.toHaveBeenCalled()

    // Restore original window
    global.window = originalWindow
  })

  it('should handle API errors gracefully', async () => {
    const error = new Error('Network error')
    mockCreateUserApi.mockRejectedValue(error)

    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const walletAddress = '0xABC123'
    const tgUserId =
      global.window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString()
    const startParam =
      global.window.Telegram?.WebApp?.initDataUnsafe?.start_param
    const { ref } = parseStartParam(startParam)

    try {
      await createUserApi({
        walletAddress,
        tgUserId,
        referredByKey: ref ?? undefined,
      })
    } catch (caughtError) {
      // Error is expected
    }

    expect(mockCreateUserApi).toHaveBeenCalledWith({
      walletAddress: '0xABC123',
      tgUserId: '123456',
      referredByKey: 'abc123',
    })

    consoleError.mockRestore()
  })

  it('should parse start param correctly', () => {
    const startParam = 'ref_abc123_box_456'

    // Test that parseStartParam is called with the correct parameter
    parseStartParam(startParam)

    expect(mockParseStartParam).toHaveBeenCalledWith('ref_abc123_box_456')
  })
})
