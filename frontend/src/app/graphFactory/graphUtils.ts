import * as d3 from 'd3';

export function createAxis(type: string, domain: any[], range: number[]) {
  if (type === 'linear') {
    return d3.scaleLinear()
    .domain(domain)
    .range(range);
  } else {
    return d3.scaleTime()
    .domain(domain)
    .range(range);
  }
}

export function getDotRay(maxRay: number, count: number, total: number) {
  return maxRay*count/total
}

export function getTotal(data: any) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total = total + data[i].count
  }
  return total
}

export function getMaxCount(data: any) {
  let max_count = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].count > max_count) {
      max_count = data[i].count
    }
  }
  return max_count
}

export function getScatterplotLegendPosition(
  rAxis: any,
  margin: number,
  ticks_num: number,
  d:any
) {
  let values = rAxis.ticks(ticks_num)
  let positions = [margin + Math.round(rAxis(values[0]))]
  for (let i = 1; i < values.length; i++) {
    let position = positions[i-1] + rAxis(values[i-1]) + margin + rAxis(values[i])
    positions.push(Math.round(position))
  }
  //console.log("values", values)
  //console.log("positions", positions)
  return positions[values.indexOf(d)]
}
