const { Relevation} = require("./m_relevation")
const { Parameters } = require("./m_parameters")

class LogItem {
    
    model = {}
    customer = ""
    relevations = new Relevation()
    parameters = new Parameters()
    timestamp = new Date()

    constructor(
        customer, model, relevations, parameters, timestamp) {
        
        this.customer = customer
        this.model = model
        this.relevations = relevations
        this.parameters = parameters
        this.timestamp = timestamp
    }
}

module.exports = {LogItem}