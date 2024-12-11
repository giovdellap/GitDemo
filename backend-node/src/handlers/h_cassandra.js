const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { QueryFactory, LogQueryFactory, RequestQueryFactory } = require("./cassandra/queryfactory");
const { DBHandler } = require("./h_dbhandler");
const { insertItem, insertItemOnly, createTable, createSecondaryIndex, deleteTable } = require("./cassandra/cassandra_utils") 
const { once } = require('events');

class CassandraDBHandler extends DBHandler{
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "admin"
  DB_CONN_STR = "bigdata-cassandra-1"
  DB_KEYSPACE = "ai_company"
  LOGS_TABLE = "logs"
  REQUEST_TABLE = "requests"

  constructor() {
    super()
    this.client = new cassandra.Client({ 
      contactPoints: [this.DB_CONN_STR], 
      localDataCenter: 'datacenter1'
      //credentials: { username: this.DB_USERNAME, password: this.DB_PASSWORD }
    });
  }

  async initialize() {
    const logFactory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    const requestFactory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)

    // LOG TABLE
    await deleteTable(this.client, logFactory)
    await createTable(this.client, logFactory)
    await createSecondaryIndex(this.client, logFactory, "tokens")
    await createSecondaryIndex(this.client, logFactory, "temperature")
    await createSecondaryIndex(this.client, logFactory, "wli")
    await createSecondaryIndex(this.client, logFactory, "presence_penalty")

    //REQUEST TABLE
    await deleteTable(this.client, requestFactory)
    await createTable(this.client, requestFactory)
  }

  async insertMultipleItems(type, items) {
    let factory = new QueryFactory(this.DB_KEYSPACE, "")
    if (type === "LOGS") {
      factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    } else {
      factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    }
    //await createTable(this.client, factory)
    for (let i = 0; i < items.length; i++) {
      await insertItemOnly(this.client, factory, items[i])
    }
  }

  async insertLogItem(item) {
    const factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    await insertItem(this.client, factory, item)
  }

  async insertRequestItem(item) {
    const factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    await insertItem(this.client, factory, item)
  }

  async basicQuery(field1, field2, model) {
    const factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    let query = factory.basicquery(field1, field2, model)
    //console.log('QUERY: ', query)
    let result = []
    
    let stream = this.client.stream(query)
    .on('readable', function () {
      // 'readable' is emitted as soon a row is received and parsed
      let row;
      while (row = this.read()) {
        result.push(row)
      }
    })
    .on('end', function () {
      // Stream ended, there aren't any more rows
    })
    .on('error', function (err) {
      // Something went wrong: err is a response error from Cassandra
    });

    await once(stream, 'end')
    //console.log()
    return result
  }

  async basicRequestQuery(field) {
    const factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    
    
    let query = factory.basicQuery(field)
    console.log('QUERY: ', query)
    let result = []
    
    let stream = this.client.stream(query)
    .on('readable', function () {
      // 'readable' is emitted as soon a row is received and parsed
      let row;
      while (row = this.read()) {
        if (field === "time") {
          //console.log(row)
          result.push({
            loading_time: row.loading_time,
            time: row["system.dateof(ts)"]
          })
        } else result.push(row)
      }
    })
    .on('end', function () {
      // Stream ended, there aren't any more rows
    })
    .on('error', function (err) {
      // Something went wrong: err is a response error from Cassandra
    });
    
    await once(stream, 'end')
    //console.log()
    return result
  }
}




module.exports = {
  CassandraDBHandler
}