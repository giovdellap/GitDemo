export class XAxisScatterplot {
  value: string
  type: string
  domain: number[]
  maxRay: number
  insight: string

  constructor(value: string, type: string, domain: number[], maxRay: number, insight: string) {
    this.value = value
    this.type = type
    this.domain = domain
    this.maxRay = maxRay
    this.insight = insight
  }
}

export const xScatterplotSettings: XAxisScatterplot[] = [
  {
    value: 'tokens',
    type: 'linear',
    domain: [0, 10000],
    maxRay: 5,
    insight: 'TOKENS RANGE: 3000-10000'
  },
  {
    value: 'wli',
    type: 'linear',
    domain: [0, 6],
    maxRay: 30,
    insight: 'WLI RANGE: 1-5'
  },
  {
    value: 'temperature',
    type: 'linear',
    domain: [0, 1],
    maxRay: 5,
    insight: 'TEMPERATURE RANGE: 0.0-1.0'
  },
  {
    value: 'presence_penalty',
    type: 'linear',
    domain: [0, 2],
    maxRay: 5,
    insight: 'PRESENCE PENALTY RANGE: 0.0-2.0'
  }
]


