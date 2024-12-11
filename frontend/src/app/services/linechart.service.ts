import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinechartService {

  xAxis: string = "satisfaction"
  xAxisEmitter = new EventEmitter<string>()

  yAxis: string = "tokens"
  yAxisEmitter = new EventEmitter<string>()

  constructor() { }

  setXAxis(arg: string) {
    this.xAxis = arg
    this.xAxisEmitter.emit(arg)
  }

  setYAxis(arg:string) {
    this.yAxis = arg
    this.yAxisEmitter.emit(arg)
  }

  getXAxis() {
    return this.xAxis
  }

  getYAxis() {
    return this.yAxis
  }

  getXAxisObservable() {
    return this.xAxisEmitter.asObservable()
  }

  getYAxisObservable() {
    return this.yAxisEmitter.asObservable()
  }
}
