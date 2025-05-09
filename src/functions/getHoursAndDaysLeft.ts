export const getHoursAndDaysLeft = (endTimeMs: number) => {
  const now = Date.now()
  const endTime = endTimeMs
  const diff = endTime - now
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  return { days, hours, isExpired: now >= endTime }
}
