class Parameters {

    constructor() {
        
    }
}

class ChartGeneratorParameters extends Parameters {

    presence_penalty = 0 // 0<x<2
    temperature = 0.2 // 0.2<x<0.6

    constructor(presence, temperature) {
        super()
        this.presence_penalty = presence
        this.temperature = temperature
    }
}

class ChartAnalyzerParameters extends Parameters {

    frequency_penalty = 0 // 0<x<2
    temperature = 0.2 // 0.2<x<0.6

    constructor(frequency, temperature) {
        super()
        this.frequency_penalty = frequency
        this.temperature = temperature
    }
}

class GraphPredictorParameters extends Parameters {

    frequency_penalty = 0 // 0<x<2
    presence_penalty = 0 // 0<x<2

    constructor(frequency, presence) {
        super()
        this.frequency_penalty = frequency
        this.presence_penalty = presence
    }
}

class MarketTrackerParameters extends Parameters {

    top_p = 0 // 0<x<1

    constructor(top_p) {
        super()
        this.top_p = top_p
    }
}



module.exports = {
    Parameters,
    ChartGeneratorParameters,
    ChartAnalyzerParameters, 
    GraphPredictorParameters,
    MarketTrackerParameters
}