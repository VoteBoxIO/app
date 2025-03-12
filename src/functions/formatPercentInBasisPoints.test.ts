import { formatPercentInBasisPoints } from './formatPercentInBasisPoints'

describe('formatPercentInBasisPoints - Range Tests (0 to 100)', () => {
  it('should handle 0 correctly', () => {
    expect(formatPercentInBasisPoints(0)).toBe(0)
  })

  it('should handle a small decimal value', () => {
    // 0.1234 becomes "0.12" then 0.12 * 100 = 12
    expect(formatPercentInBasisPoints(0.1234)).toBe(12)
  })

  it("should handle Euler's number approximation", () => {
    // 2.71828 becomes "2.72" then 2.72 * 100 = 272
    expect(formatPercentInBasisPoints(2.71828)).toBe(272)
  })

  it('should handle 20.125 correctly', () => {
    // 20.125 rounds to "20.12" then 20.12 * 100 = 2013
    expect(formatPercentInBasisPoints(20.125)).toBe(2013)
  })

  it('should handle a one-decimal number', () => {
    // 37.1 is treated as 37.10 then 37.1 * 100 = 3710
    expect(formatPercentInBasisPoints(37.1)).toBe(3710)
  })

  it('should handle a value with more decimals', () => {
    // 50.555 becomes "50.56" then 50.56 * 100 = 5055
    expect(formatPercentInBasisPoints(50.555)).toBe(5055)
  })

  it('should handle 99.994 correctly', () => {
    // 99.994 rounds to "99.99" then 99.99 * 100 = 9999
    expect(formatPercentInBasisPoints(99.994)).toBe(9999)
  })

  it('should handle 99.995 correctly', () => {
    // 99.995 rounds to "100.00" then 100.00 * 100 = 10000
    expect(formatPercentInBasisPoints(99.995)).toBe(10000)
  })

  it('should handle 100 as an integer', () => {
    // 100 is an integer so 100 * 100 = 10000
    expect(formatPercentInBasisPoints(100)).toBe(10000)
  })
})
