const { countItems, roundFloats, roundToInt, groupBy, calculateMean } = require("./utils/queryUtils")
const { getHandler } = require("./controller_utils")
const PCA = require ("pca-js")

const basicQuery = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  let response = []
  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)
  if (field2 === 'temperature') {
    for (item in dbResponse) {
      if(item.temperature === 0 || isNaN(item.temperature)) {
        dbResponse.splice(dbResponse.indexOf(item), 1)
      }
    }
  }
  if (field2 === 'presence_penalty') {
    for (item in dbResponse) {
      if(item.presence_penalty === 0 || isNaN(item.presence_penalty)) {
        dbResponse.splice(dbResponse.indexOf(item), 1)
      }
    }
  }
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  let arr = roundFloats(dbResponse, [field1, field2])
  response = countItems(arr, field1, field2) 
  
  res.json(response)
})

const basicQueryNoCount = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  //let response = []
  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)

  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  //response = countItems(arr, field1, field2) 
  
  res.json(dbResponse)
})

const linechartQuery = ( async (req, res) => {

  const field1 = req.body.field1
  const field2 = req.body.field2
  const model_filter = req.body.model_filter

  //let response = []
  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicQuery(field1, field2, model_filter)
  console.log("RESPONSE LENGTH: ", dbResponse)
  let response = calculateMean(dbResponse, field1, field2)
  console.log('LINECHART RESPONSE', response)

  
  //let arr = roundFloats(dbResponse, [field1, field2])
  //response = countItems(arr, field1, field2) 
  
  res.json(response)
})


const wliBoxplotQuery = ( async (req, res) => {

  const field = req.body.field
  const model_filter = req.body.model_filter

  let response = []
  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicQuery('wli', field, model_filter)
  //console.log(dbResponse)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundToInt(dbResponse, [field, 'wli'])
  response = groupBy(dbResponse, 'wli', field) 
  
  res.json(response)
})

const basicRequestQuery = ( async (req, res) => {

  const field = req.body.field

  let response = []
  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicRequestQuery(field)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  response = countItems(dbResponse, field, "loading_time") 
  
  res.json(response)
})

const basicRequestNoCountQuery = ( async (req, res) => {

  const field = req.body.field

  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicRequestQuery(field)
  console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  //response = countItems(dbResponse, field, "loading_time") 
  
  res.json(dbResponse)
})

const pcaRequestQuery = ( async (req, res) => {

  const field = req.body.field

  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.basicRequestQuery(field)
  console.log("RESPONSE LENGTH: ", dbResponse.length)

  // transorm items to numbers arrays
  let onlyNumbers = []
  for (let i = 0; i < dbResponse.length; i++) {
    //let item = [dbResponse[i]['loading_time'], dbResponse [i][field]]
    let item = [dbResponse [i][field], dbResponse[i]['loading_time']]

    onlyNumbers.push(item)
  }
  console.log('ONLYNUMBERS: ',onlyNumbers)
  let vectors = PCA.getEigenVectors(onlyNumbers)
  //var first = PCA.computePercentageExplained(vectors,vectors[0])
  //var topTwo = PCA.computePercentageExplained(vectors,vectors[0],vectors[1])
  
  var adData = PCA.computeAdjustedData(onlyNumbers,vectors[0])
  let results = []
  console.log('FORMATTEDDATA: ', adData.formattedAdjustedData)
  for (let i = 0; i < adData.formattedAdjustedData[0].length; i++) {
    let result = {}
    result['loading_time'] = 0
    result[field] = adData.formattedAdjustedData[0][i]
    results.push(result)
  }
  response = countItems(results, field, "loading_time") 


  //console.log(adData)
  res.json(response)
})

const test = ( async (req, res) => {

  const test = ( async (req, res) => {

    let dbHandler = getHandler(process.env.DB)
  
    let dbResponse = await dbHandler.test()
    console.log("dbResponse: ", dbResponse)
    //console.log("RESPONSE LENGTH: ", dbResponse.length)
    //let arr = roundFloats(dbResponse, [field1, field2])
    res.json(dbResponse)
  
  })

  let dbHandler = getHandler(process.env.DB)

  let dbResponse = await dbHandler.test()
  console.log("dbResponse: ", dbResponse)
  //console.log("RESPONSE LENGTH: ", dbResponse.length)
  //let arr = roundFloats(dbResponse, [field1, field2])
  res.json(dbResponse)

})

  
module.exports = {
  basicQuery,
  basicQueryNoCount,
  wliBoxplotQuery,
  basicRequestQuery,
  basicRequestNoCountQuery,
  pcaRequestQuery,
  test,
  linechartQuery
}
  