const { SpecialRequest } = require("../../model/m_request")
const {InfluxDB, Point} = require('@influxdata/influxdb-client')

function LogItemToPoint(item) {
    //console.log(item)

    let point = new Point("logItem")
    .tag("customer", item.customer)
    .tag("model", item.model.name)
    .tag("version", item.model.version)
    .tag("wli", item.relevations.wli)
    .tag("tokens", item.relevations.tokens)
    .intField("generations", item.relevations.generations)
    .intField("satisfaction", item.relevations.satisfaction)
    .timestamp(item.timestamp)
    
    switch(item.model.name) {
        case "ChartGenerator":
            point
            .tag("presence_penalty", item.parameters.presence_penalty)
            .tag("temperature", item.parameters.temperature)
            break
        case "ChartAnalyzer":
            point
            .tag("frequency_penalty", item.parameters.frequency_penalty)
            .tag("temperature", item.parameters.temperature)
            break
        case "GraphPredictor":
            point
            .tag("frequency_penalty", item.parameters.frequency_penalty)
            .tag("presence_penalty", item.parameters.presence_penalty)
            break
        case "MarketTracker":
            point
            .tag("top_p", item.parameters.top_p)
            break
    }
    return point
}

function RequestToPoint(item) {
    let point = new Point("request")
    .tag("input_tokens", item.input_tokens)
    .tag("total_tokens", item.total_tokens)
    .tag("stream_messages", item.stream_messages)
    .intField("loading_time", item.loading_time)
    .timestamp(item.timestamp)
    if (item instanceof SpecialRequest) {
        point.tag("input_dimension", item.input_dimension)
    }
    return point
}

module.exports = {
    LogItemToPoint,
    RequestToPoint
}
