const {InfluxDB, HttpError} = require('@influxdata/influxdb-client')
const {OrgsAPI, BucketsAPI} = require('@influxdata/influxdb-client-apis')
const { DBHandler } = require('./h_dbhandler')
const { LogItemToPoint, RequestToPoint } = require('./influxdb/influx_utils')
const { InfluxQueryFactory } = require('./influxdb/queryfactory')
//import {InfluxDB, Point} from '@influxdata/influxdb-client'

class InfluxDBHandler extends DBHandler{
    
  url = "http://influxdb:8086"
  token = "kUERQvP1fV7Tra0oo1CbaRIsqHgixJS_qgp5H02zmXOq3dtU0s8O-CGCecPMoWMo1riv5hS3WsJHHr"
  org = "my-org"
  bucket = "ai_company"

  constructor() {
    super()
    //console.log("url: ", this.url)
    this.client = new InfluxDB({url : this.url, token : this.token})
  }

  async initialize() {
    this.recreateBucket(this.bucket)
  }


  async insertMultipleItems(type, items) {
    
    let points = []
    for (let i = 0; i < items.length; i++) {
      let point = {}
      if (type === "LOGS") {
        point = LogItemToPoint(items[i])
      } else {
        point = RequestToPoint(items[i])
      }
      points.push(point)
    }

    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoints(points)
    await this.closeConnection(writeApi)
  }

  async insertLogItem(item) {
    let point = LogItemToPoint(item)
    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoint(point)
    await this.closeConnection(writeApi)
  }

    
  async insertRequestItem(item) {
    let point = RequestToPoint(item)
    let writeApi = this.client.getWriteApi(this.org, this.bucket)
    writeApi.writePoint(point)
    await this.closeConnection(writeApi)
  }

  async basicQuery(field1, field2, model) {

    const queryFactory = new InfluxQueryFactory(this.bucket)
    console.log(field1, field2)
    const fluxQuery = queryFactory.getBasicQuery(field1, model)
    console.log('QUERY: ', fluxQuery)
    let result = await this.queryRows(fluxQuery, field1, field2)
    return result
  }

  async basicRequestQuery(field) {

    const queryFactory = new InfluxQueryFactory(this.bucket)
    const fluxQuery = queryFactory.getRequestQuery()
    console.log('QUERY: ', fluxQuery)
    let result = await this.queryRows(fluxQuery, "loading_time", field)
    return result
  }

  async recreateBucket(name) {
    const orgsAPI = new OrgsAPI(this.client)
    const organizations = await orgsAPI.getOrgs({org: this.org})
    const orgID = organizations.orgs[0].id
    const bucketsAPI = new BucketsAPI(this.client)
    try {
      const buckets = await bucketsAPI.getBuckets({orgID, name})
      if (buckets && buckets.buckets && buckets.buckets.length) {
        const bucketID = buckets.buckets[0].id
        await bucketsAPI.deleteBucketsID({bucketID})
      }
    } catch (e) {
      if (e instanceof HttpError && e.statusCode == 404) {
        // OK, bucket not found
      } else {
        throw e
      }
    }
  
    // creates a bucket, entity properties are specified in the "body" property
    const bucket = await bucketsAPI.postBuckets({body: {orgID, name}})
    
  }

  async queryRows(query, field1, field2) {
    let result = []
    const queryApi = this.client.getQueryApi(this.org)
    for await (const {values, tableMeta} of queryApi.iterateRows(query)) {
      // the following line creates an object for each row
      //const o = await tableMeta.toObject(values)
      //console.log(o)
      //result.push(o)
      
      // console.log(JSON.stringify(o, null, 2)
      
      let obj = {}
      obj[field1] = await tableMeta.get(values, '_value')
      //console.log(tableMeta.get(row, field1))
      if (field2 !== 'time') {
        let value2 = await tableMeta.get(values, field2)
        obj[field2] = Number(value2)
      } else {
        let value2 = await tableMeta.get(values, '_time')
        obj[field2] = value2
      }
      result.push(obj)
    }
    //console.log(result[0])
    //console.log('fuori dal for', result.length)
    return result
  }
  

  async closeConnection(writeApi) {
    try {
      await writeApi.close()
      //console.log('FINISHED')
    } catch (e) {
      console.error(e)
      if (e instanceof HttpError && e.statusCode === 401) {
        console.log('Httperror', e)
      }
      //console.log('\nFinished ERROR')
    }
  }

  async test() {
    const query = 'from(bucket: "ai_company") |> range(start: -60d) |> filter(fn: (r) => r._measurement == "satisfaction") |> window(period: 1s) |> group(columns: ["_start"]) |> count()'
    let result = []
    const queryApi = this.client.getQueryApi(this.org)
    for await (const {values, tableMeta} of queryApi.iterateRows(query)) {
      // the following line creates an object for each row
      const o = await tableMeta.toObject(values)
      result.push(o)
      //console.log(o)
      //result.push(o)
    }
    console.log('fuori dal for', result.length)
    return result
  }
}

module.exports = {
  InfluxDBHandler
}
