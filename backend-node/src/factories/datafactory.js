const { getRateClassification } = require("./rates.js");
const { getDates } = require("./utils.js");
const { newItem, getRate } = require("./log_utils.js");
const { newRequest } = require("./request_utils.js");

class DataFactory {

    logSet = []
    requestSet = []

    constructor() {
    }

    generateOneDay(date, db) {
        for (let i = 0; i < 24; i++) {
            let newDate = date
            newDate.setHours(i, 0, 1)
            //console.log("GENERATION - STARTING TIME: ", newDate)
            this.generateOneHour(newDate, db)
            //console.log("GENERATION - LOGSET LENGTH: ", this.logSet.length)
            //console.log("GENERATION - REQUESTSET LENGTH: ", this.requestSet.length)
        }
    }

    generateOneHour(date, db) {        
        let rateClassification = getRateClassification(date)
        //console.log('rate classification: ', rateClassification)

        let rate = getRate(rateClassification)
        if (db === "cassandra") {
            rate = Math.floor(rate/3)
        }
        //console.log("logs rate: ", rate)

        let dates = getDates(date, rate)

        for (let i = 0; i < rate; i++) {
            let item = newItem(dates[i], rateClassification)
            this.logSet.push(item)
            if ((i % 2) === 0) {
                let request = newRequest(
                    (item.model.name === "ChartAnalyzer"),
                    dates[i]
                )
                this.requestSet.push(request)
            }
        }

    }

    get logSet() {
        return this.logSet
    }

    get requestSet() {
        return this.requestSet
    }

}

module.exports = {DataFactory}