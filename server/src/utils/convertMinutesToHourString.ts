export function convertMinutesToHourString(minutes: number): string{
  const hourMinutes = minutes % 60
  const hourHours = Math.floor(minutes / 60)

  return `${String(hourHours).padStart(2, '0')}:${String(hourMinutes).padStart(2, '0')}`
}