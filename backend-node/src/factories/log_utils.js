const model = require("../model/m_model");
const { LogItem} = require("../model/m_logitem")
const { Relevation } = require("../model/m_relevation");
const { ChartGeneratorParameters, ChartAnalyzerParameters, GraphPredictorParameters, MarketTrackerParameters } = require("../model/m_parameters");
const { randomNumber, randomFloat } = require("./utils")

function newItem(date, classification) {

    let customer = randomCustomer()
    let model = randomModel()
    let temperature = randomFloat(0.2, 0.6)
    let tokens = randomNumber(3000, 10001)
    let relevation = getRelevation(classification, tokens, temperature, model)
    let parameters = getParameters(model.name, temperature)

    return new LogItem(
        customer,
        model,
        relevation,
        parameters,
        date
    )
}

function randomModel() {
    let modelArray = model.models
    let model_index = 0
    let fl = randomFloat(0, 1)
    if(fl > 0.35 && fl <= 0.7) {
        model_index = 1
    }
    if (fl > 0.7 && fl < 0.85) {
        model_index = 2
    }
    if (fl > 0.85) {
        model_index = 3
    }

    selected = modelArray[model_index]
    version_index = randomNumber(0, selected.versions.length)
    return new model.Model(selected.name, selected.versions[version_index])
}

function randomCustomer() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(randomNumber(0, chars.length + 1)));
    }
    for (let i = 0; i < 3; i++) {
        result += randomNumber(0, 10).toString();
      }
    return result;
  }
  
function getParameters(name, temperature) {
    switch (name) {
        case "ChartGenerator":
            return new ChartGeneratorParameters(randomFloat(0, 2), temperature)
        case "ChartAnalyzer":
            return new ChartAnalyzerParameters(randomFloat(0, 2), temperature)
        case "GraphPredictor":
            return new GraphPredictorParameters(randomFloat(0, 2), randomFloat(0, 2))
        case "MarketTracker":
            return new MarketTrackerParameters(randomFloat(0, 1))
    }
}

function getRelevation(classification, tokens, temperature, model) {
    let wli = getWli(classification)
    
    let satisfaction = randomFloat(4.2, 5)
    let wli_factor = wli * 0.25
    let tokens_factor = tokens / 20000

    satisfaction = satisfaction - (wli_factor + tokens_factor)
    if ((wli_factor + tokens_factor) > 0.7) {
        satisfaction = satisfaction - (wli_factor + tokens_factor)
    }
    if (temperature > 0.4) {
        satisfaction = satisfaction - temperature
    }

    let generations = randomFloat(0.8, 3.5) + (tokens / 5000) + (wli * 0.4)
    if (temperature > 0.4) {
        generations = generations + (temperature * 2)
    }
    satisfaction = satisfaction + getSatifactionModifier(model.name)
    generations = generations + getGenerationsModifier(model.name)

    return new Relevation (
        Math.round(generations),
        Math.round(satisfaction),
        wli, tokens
    )
}

function getGenerationsModifier(model_name) {
    if (model_name === "ChartGenerator" || model_name === "ChartAnalyzer") {
        return randomFloat (0.8, 1.3)
    } else {
        return - randomFloat(0.6, 1.1)
    }
}

function getSatifactionModifier(model_name) {
    if (model_name === "ChartGenerator" || model_name === "ChartAnalyzer") {
        return - randomFloat (0.3, 0.6)
    }
    if (model_name === "MarketTracker") {
        return randomFloat(0.3, 0.6)
    }
    return 0
}

function getRate(classification) {
    switch (classification) {
        case "LOW":
            return randomNumber(5, 21)
        case "MEDIUM":
            return randomNumber(21, 41)
        case "HIGH":
            return randomNumber(41, 80)
        default:
            return 10
    }
}

function getWli(classification) {
    switch (classification) {
        case "LOW":
            return randomNumber(1, 3)
        case "MEDIUM":
            return randomNumber(3, 5)
        case "HIGH":
            return 5
        default:
            return 10
    }
}

module.exports = {
    newItem,
    getRate,
    getWli
}