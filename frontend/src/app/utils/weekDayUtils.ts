
export const weekdayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const emptysvgArray = [{}, {}, {}, {}, {}, {}, {}]

export const emptydataArray: WeekdayLogItem[][] = [[], [], [], [], [], [], []]

export class WeekdayLogItem {
  loading_time: number
  date: Date
  weekDay: string

  constructor(loading_time: number, date: Date, weekDay: string) {
    this.loading_time = loading_time
    this.date = date
    this.weekDay = weekDay
  }
}

export function getMinMaxDates(minHour: number, minMinute:number, maxHour: number, maxMinute: number): Date[] {
  let min = new Date()
  min.setHours(minHour, minMinute, 0)
  let max = new Date()
  max.setHours(maxHour, maxMinute, 59)
  return [min, max]
}

export function getMiddleDate(hour: number, minute: number, seconds: number): Date{
  let date = new Date()
  date.setHours(hour, minute, seconds)
  return date
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes*60000)
}

export class WeekdaySlot {
  minDate: Date
  maxDate: Date
  date: Date
  loading_times: number[] = []

  constructor(dates: Date[], date: Date) {

    this.minDate = dates[0]
    this.maxDate = dates[1]
    this.date = date
  }

  addTime(time: number) {
    this.loading_times.push(time)
  }
}
