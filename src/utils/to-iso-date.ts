import { formatISO } from 'date-fns'

export default function toISODate(value: string | number | Date): string {
  return formatISO(new Date(value), { representation: 'date' })
}
