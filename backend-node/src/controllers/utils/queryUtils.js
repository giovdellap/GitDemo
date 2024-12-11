function countItems(data, value1, value2) {
    let resArray = []
    for (let i = 0; i < data.length; i++) {
        let resIndex = undefined
        for (let j = 0; j < resArray.length; j++) {
            if (data[i][value1] === resArray[j][value1] 
            && data[i][value2] === resArray[j][value2]) {
                resIndex = j
            }
        }
        if (resIndex) {
            resArray[resIndex].count++
        } else {
            let obj = data[i]
            obj.count = 1
            resArray.push(obj)
        }
    }
    return resArray.slice(1, resArray.length)
}

//value2 è il valore sul quale calcoliamo la media (tokens/wli)
function calculateMean(data, value1, value2) {

    //calculate count and sum
    let countArray = []
    for (let i = 0; i < data.length; i++) {
        let resIndex = undefined
        for (let j = 0; j < countArray.length; j++) {
            if (data[i][value1] === countArray[j][value1]) {
                resIndex = j
            }
        }
        if (resIndex) {
            countArray[resIndex].count++
            countArray[resIndex].sum = countArray[resIndex].sum + data[i][value2]
        } else {
            let obj = data[i]
            obj.count = 1
            obj.sum = data[i][value2]
            countArray.push(obj)
        }
    }
    countArray = countArray.slice(1, countArray.length)

    // calculate mean
    let resArray = []
    for (let i = 0; i < countArray.length; i++) {
        let obj = {}
        obj[value1] = countArray[i][value1]
        obj[value2] = countArray[i].sum/countArray[i].count
        resArray.push(obj)
    }
    
    return resArray
}

function roundFloats(data, values) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < values.length; j++) {
            obj[values[j]] = data[i][values[j]].toFixed(2)
        }
        res.push(obj)
    }
    return res
}

function roundToInt(data, values) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let obj = {}
        for (let j = 0; j < values.length; j++) {
            obj[values[j]] = Math.round(data[i][values[j]])
        }
        res.push(obj)
    }
    return res
}

function groupBy(data, groupField, analyzedField) {
    let res = []
    for (let i = 0; i < data.length; i++) {
        let resIndex = undefined
        //console.log('DATAITEM: ', data[i])
        //console.log('RES: ', res)
        for (let j = 0; j < res.length; j++) {
            if (res[j][groupField] === data[i][groupField]) {
                resIndex = j
            }
        }
        if(resIndex) {
            res[resIndex]['data'].push(data[i][analyzedField])
        } else {
            //console.log(res)

            let obj = {}
            obj[groupField] = data[i][groupField]
            obj['data'] = [data[i][analyzedField]]
            res.push(obj)
        }
    }
    //return res
    return res.slice(1, res.length)
}

module.exports = {
    countItems,
    roundFloats,
    roundToInt,
    groupBy,
    calculateMean
}