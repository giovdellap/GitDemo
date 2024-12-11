export class YAxisBoxPlot {
  value: string
  type: string
  domain: number[]

  constructor(value: string, type: string, domain: number[]) {
    this.value = value
    this.type = type
    this.domain = domain
  }
}

export const wliboxplotsettings: YAxisBoxPlot[] = [
  {
    value: 'satisfaction',
    type: 'linear',
    domain: [0, 5],
  },
  {
    value: 'generations',
    type: 'linear',
    domain: [0, 10],
  }
]
