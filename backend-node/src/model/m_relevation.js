class Relevation {
    
    generations = 0
    satisfaction = 0
    wli = 0
    tokens = 0

    constructor(generations, satisfaction, wli, tokens) {
        this.generations = generations
        this.satisfaction = satisfaction
        this.wli = wli
        this.tokens = tokens
    }
}

module.exports = {
    Relevation
}