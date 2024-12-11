import { Injectable } from '@angular/core';
import { BasicRequestQueryItem } from '../model/queryresponses/basicRequestQueryItem';
import { addMinutes, emptydataArray, getMiddleDate, getMinMaxDates, WeekdayLogItem, weekdayNames, WeekdaySlot } from '../utils/weekDayUtils';

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {

  dataArray: WeekdayLogItem[][] = emptydataArray
  singleArray: WeekdayLogItem[] = []

  constructor() { }

  insertArray(data: BasicRequestQueryItem[]) {
    this.dataArray = emptydataArray
    for (let i = 0; i < data.length; i++) {
      let originalDate = new Date(data[i].time)
      let newDate = new Date()
      newDate.setHours(
        originalDate.getHours(),
        originalDate.getMinutes(),
        originalDate.getSeconds()
      )
      let obj = new WeekdayLogItem(data[i].loading_time, newDate, weekdayNames[originalDate.getDay()])
      this.dataArray[originalDate.getDay()].push(obj)
    }
  }

  generateSingleLinechartArray() {
    for (let weekday = 0; weekday < 7; weekday++) {

      // SLOT CREATION

      // Estremi
      let slots: WeekdaySlot[] = []

      // inizio ciclo
      let dates = getMinMaxDates(0, 0, 0, 9)
      let middleDate = getMiddleDate(0, 5, 0)
      slots.push(new WeekdaySlot(dates, middleDate))
      let lastMaxHour = getMiddleDate(23, 59, 59)

      while(dates[1] < lastMaxHour) {
        dates[0] = addMinutes(dates[0], 10)
        dates[1] = addMinutes(dates[1], 10)
        middleDate = addMinutes(middleDate, 10)
        slots.push(new WeekdaySlot(dates, middleDate))
      }

      // aggiunta loading time agli slot
      for (let i = 0; i < this.dataArray[weekday].length; i++) {
        let log = this.dataArray[weekday][i]
        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
          if(log.date > slots[slotIndex].minDate && log.date < slots[slotIndex].maxDate) {
            slots[slotIndex].addTime(log.loading_time)
          }
        }
      }

      // generazione singleArray
      for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        let slot = slots[slotIndex]
        let loadingTime = 0
        for (let j = 0; j < slot.loading_times.length; j++) {
          loadingTime = loadingTime + slot.loading_times[j]
        }
        this.singleArray.push(new WeekdayLogItem(loadingTime/slot.loading_times.length, slot.date, weekdayNames[weekday]))
      }
    }
  }

  getWeekDay(weekday: number): WeekdayLogItem[] {
    return this.dataArray[weekday]
  }

  getSingleWeekDay(weekDay: number) {
    return this.singleArray[weekDay]
  }

}
