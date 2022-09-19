export function convertHourStringToMinutes(hours: string): number{
  const [hour, minutes] = hours.split(':').map(Number)
  
  return (hour * 60) + minutes
}