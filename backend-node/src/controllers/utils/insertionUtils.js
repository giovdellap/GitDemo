const { DataFactory } = require("../../factories/datafactory.js")

async function generateandInsertOneDay(date, dbHandler, db) {
  const dataFactory = new DataFactory()
  dataFactory.generateOneDay(date, db)

  // DB INSERTION 
  //console.log("DB INSERTION - INITIALIZATION")
  await dbHandler.insertMultipleItems("LOGS", dataFactory.logSet)
  //console.log("DB INSERTION - LOGSET OK")
  await dbHandler.insertMultipleItems("REQUESTS", dataFactory.requestSet)
  //console.log("DB INSERTION - REQUESTSET OK")
  return dataFactory.logSet.length
}



module.exports = {
    generateandInsertOneDay
}