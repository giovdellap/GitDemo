class Model {
    
    name = ""
    version = ""

    constructor(name, version) {
        this.name = name
        this.version = version
    }
}


const models = [
    {
        name: "ChartGenerator",
        versions: [1, 2, 3] 
    },
    {
        name: "ChartAnalyzer",
        versions: [2, 5] 
    },
    {
        name: "GraphPredictor",
        versions: [1, 3, 6] 
    },
    {
        name: "MarketTracker",
        versions: [5, 6, 7] 
    }
]

module.exports = {
    Model,
    models
}