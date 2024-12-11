// min incluso, max escluso
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    let str = (Math.random() * (max - min) + min).toFixed(2)
    return parseFloat(str)
}

function getDates(date, rate) {
    let dates = []
    for (let i = 0; i < rate; i++) {
        dates.push(new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            randomNumber(0, 60),
            randomNumber(0, 60)
        ))
    }
    return dates
}

module.exports = {
    randomNumber,
    randomFloat,
    getDates
}