const { getRequestClassification } = require("./rates");
const { randomNumber, randomFloat } = require("./utils");
const { Request, SpecialRequest } = require("../model/m_request")

function newRequest(special, date) {
    let input_tokens = randomNumber(1000, 10001)
    let total_tokens = input_tokens + randomNumber(10000, 70001)
    let stream_messages = randomNumber(1, 9)
    let input_dimension = 0
    let loading_time = 0
    if (special) {
        //console.log('IM SPECIAL')
        input_dimension = randomNumber(1000, 8001)
    }

    let classification = getRequestClassification(date)
    // date/hour increase
    if (getRequestClassification(date) === "LOW") {
        loading_time = randomNumber(10, 31) 
    } else {
        loading_time = randomNumber(25, 60)
    }

    // total tokens increase
    loading_time = loading_time + ((total_tokens - input_tokens)/ 2000)

    // input dimension increase
    if(input_dimension > 0) {
        let multiplier = 0
        if (input_dimension > randomNumber(2000, 4000)) {
            multiplier = randomFloat(1, 1.4)
        } else {
            multiplier = randomFloat(0.5, 0.8)
        }
        let add = Math.round((25/8000*input_dimension) * multiplier)
        loading_time = loading_time + add
    }
    
    if (special) {
        return new SpecialRequest(
            input_tokens,
            total_tokens,
            date,
            Math.round(loading_time),
            stream_messages,
            input_dimension
        )
    } else {
        return new Request(
            input_tokens,
            total_tokens,
            date,
            Math.round(loading_time),
            stream_messages
        )
    }

}

module.exports = {
    newRequest
}

