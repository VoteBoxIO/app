/**
 * @value положительное число с плавающей запятой
 * @returns значение, округленное до 2 знаков после запятой (если оно не целое) и умноженное на 100.
 */
export const formatPercentInBasisPoints = (value: number): number => {
  const rounded = Number.isInteger(value) ? value : parseFloat(value.toFixed(2))
  return Math.round(rounded * 100)
}
