export class YAxisScatterplot {
  value: string
  type: string
  domain: number[]
  maxRay: number

  constructor(value: string, type: string, domain: number[], maxRay: number) {
    this.value = value
    this.type = type
    this.domain = domain
    this.maxRay = maxRay
  }
}

export const yScatterplotSettings: YAxisScatterplot[] = [
  {
    value: 'generations',
    type: 'linear',
    domain: [0, 10],
    maxRay: 5
  },
  {
    value: 'satisfaction',
    type: 'linear',
    domain: [0, 6],
    maxRay: 30
  },

]
