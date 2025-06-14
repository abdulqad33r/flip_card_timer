export const formatTime = (value: number) => String(value).padStart(2, "0")

export const getRemainingTime = () => {
  const now = new Date()

  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  )
  const remainingTime = endOfDay.getTime() - now.getTime()

  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)

  return { hours, minutes, seconds, remainingTime }
}
