import * as Plot from "@observablehq/plot";
import { getLineChartSettings, getWLIBoxPlotSettings } from "../model/plotSettings/plotSettings";
import { BasicQueryNoCountResponseItem } from "../model/queryresponses/basicQueryNoCountResponse";
import { getMinMaxDates, WeekdayLogItem } from "../utils/weekDayUtils";

export class PlotFactory {
  private margin = 40;
  private width
  private height

  constructor(width: number, height: number) {
    this.width = width - (this.margin * 2)
    this.height = height - (this.margin * 2)
  }

  getWLIBoxplot(data: BasicQueryNoCountResponseItem[], yAxis: string) {
    const settings = getWLIBoxPlotSettings(yAxis)
    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: 1,
      label: settings.yLabel,
      domain: settings.yDomain,
    }
    let fxOptions: Plot.ScaleOptions = {
      interval: 1,
      domain: settings.fxDomain,
      label: "WLI",
      labelAnchor: "right",
      tickFormat: (x) => x.toFixed(1),
    }
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      y: yOptions,
      fx: fxOptions,
      marks: [
        //ruleY([0]),
        Plot.boxY(data, {fx: "wli", y: yAxis}),
        Plot.frame()
      ]
    })
  }

  getTokensBoxplot(data: BasicQueryNoCountResponseItem[], xAxis: string) {
    const settings = getWLIBoxPlotSettings(xAxis)
    console.log(settings)
    let yOptions: Plot.ScaleOptions = {
      label: 'tokens',
      //domain: [0, 10000],
      //tickFormat: (x) => 1,
    }
    let fxOptions: Plot.ScaleOptions = {
      interval: 1,
      label: settings.yLabel,
      labelAnchor: "right",
      //tickFormat: (x) => 1,

    }
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      fx: fxOptions,
      y: yOptions,
      marks: [
        //ruleY([0]),
        Plot.boxY(data, {fx: settings.valueAPI, y: 'tokens'}),
        Plot.frame()
      ]
    })
  }

  getLineChart(data: BasicQueryNoCountResponseItem[], xAxis: string, yAxis: string) {

    let xSettings = getLineChartSettings(xAxis)
    let ySettings = getLineChartSettings(yAxis)

    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: ySettings.interval,
      label: yAxis,
      domain: ySettings.domain,
    }
    let xOptions: Plot.ScaleOptions = {
      grid: true,
      interval: xSettings.interval,
      domain: xSettings.domain,
      label: xAxis,
      labelAnchor: "right",
      //tickFormat: (x) => x.toFixed(1),
    }
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      x: xOptions,
      y: yOptions,
      marks: [
        //ruleY([0]),
        Plot.lineY(data, {x: xAxis, y: yAxis, sort: xAxis}),
        Plot.frame()
      ]
    })
  }

  getColoredLineChart(data: BasicQueryNoCountResponseItem[], xAxis: string, yAxis: string) {

    let xSettings = getLineChartSettings(xAxis)
    let ySettings = getLineChartSettings(yAxis)

    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: ySettings.interval,
      label: yAxis,
      domain: ySettings.domain,
    }
    let xOptions: Plot.ScaleOptions = {
      grid: true,
      interval: xSettings.interval,
      domain: xSettings.domain,
      label: xAxis,
      labelAnchor: "right",
      //tickFormat: (x) => x.toFixed(1),
    }
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      x: xOptions,
      y: yOptions,
      color: {legend: true},
      marks: [
        //ruleY([0]),
        Plot.lineY(data, {x: xAxis, y: yAxis, sort: xAxis, stroke: 'model'}),
        Plot.frame()
      ]
    })
  }

  getWeekdayLineChart(data: WeekdayLogItem[]) {

    console.log(data)

    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: 10,
      label: 'loading time',
      domain: [0, 100],
    }
    let xOptions: Plot.ScaleOptions = {
      type: 'time',
      grid: true,
      domain: getMinMaxDates(0, 0, 23, 59),
      label: 'daytime',
      labelAnchor: "right",
      //tickFormat: (x) => x.toFixed(1),
    }
    console.log(data)
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      x: xOptions,
      y: yOptions,
      color: {
        legend: true,
        scheme: "Spectral"
      },
      marks: [
        //ruleY([0]),
        Plot.lineY(data, {x: 'date', y: 'loading_time', stroke: 'weekDay'}),
        Plot.frame()
      ]
    })
  }
}
