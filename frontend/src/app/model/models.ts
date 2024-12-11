export const models = [
  "all",
  "ChartGenerator",
  "ChartAnalyzer",
  "GraphPredictor",
  "MarketTracker"
]

export class ModelScatterplot {
  value: string = ""
  temperature: boolean = false
  presence_penalty: boolean = false
}

export const scatterplotModels: ModelScatterplot[] = [
  {
    value: "all",
    temperature: true,
    presence_penalty: true
  },
  {
    value: "ChartGenerator",
    temperature: false,
    presence_penalty: false
  },
  {
    value: "ChartAnalyzer",
    temperature: false,
    presence_penalty: true
  },
  {
    value: "GraphPredictor",
    temperature: true,
    presence_penalty: false
  },
  {
    value: "all",
    temperature: true,
    presence_penalty: true
  },
]
