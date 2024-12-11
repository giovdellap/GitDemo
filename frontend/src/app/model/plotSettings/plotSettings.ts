
export class WLIBoxPlotSettings {
  valueAPI: string = ""
  yLabel: string = ""
  yDomain: number[] = []
  fxDomain: number[] = []
}

export class LineChartScaleSettings {
  value: string = ""
  interval: number = 0
  domain: number[] = []

}

export const lineChartScaleSettings: LineChartScaleSettings[] = [
  {
    value: 'wli',
    interval: 1,
    domain: [0, 5]
  },
  {
    value: 'tokens',
    interval: 500,
    domain: [0, 10000]
  },
  {
    value: 'generations',
    interval: 1,
    domain: [0, 10]
  },
  {
    value: 'satisfaction',
    interval: 1,
    domain: [0, 5]
  }
]


export const wliboxplotSettings: WLIBoxPlotSettings[] = [
  {
    valueAPI: "satisfaction",
    yLabel: "Satisfaction",
    yDomain: [0, 5],
    fxDomain: [1, 2, 3, 4, 5]
  },
  {
    valueAPI: "generations",
    yLabel: "Generations",
    yDomain: [0, 10],
    fxDomain: [1, 2, 3, 4, 5]
  },
]

export function getWLIBoxPlotSettings(value: string): WLIBoxPlotSettings {
  for (let i = 0; i < wliboxplotSettings.length; i++) {
    if(value === wliboxplotSettings[i].valueAPI) {
      return wliboxplotSettings[i]
    }
  }
  return new WLIBoxPlotSettings()
}

export function getLineChartSettings(value: string): LineChartScaleSettings {
  for (let i = 0; i < lineChartScaleSettings.length; i++) {
    if(value === lineChartScaleSettings[i].value) {
      return lineChartScaleSettings[i]
    }
  }
  return new LineChartScaleSettings()
}


