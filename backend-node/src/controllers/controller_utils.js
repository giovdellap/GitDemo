const { InfluxDBHandler} = require("../handlers/h_influx.js")
const { CassandraDBHandler } = require("../handlers/h_cassandra.js")
const { DBHandler } = require("../handlers/h_dbhandler.js")

function getHandler(db) {
    if (db === "cassandra") {
      return new CassandraDBHandler()
    } else {
      return new InfluxDBHandler()
    }
}

module.exports = {
    getHandler
}