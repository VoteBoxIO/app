export const getTimeLeft = (endTimeMs: number) => {
  const now = Date.now()
  const endTime = endTimeMs
  const diff = endTime - now
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes, isExpired: now >= endTime }
}
