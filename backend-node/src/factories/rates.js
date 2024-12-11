const lowLogs = [
    {
        day: 0,
        start: 4,
        end: 12
    },
    {
        day: 1,
        start: 20,
        end: 24
    },
    {
        day: 2,
        start: 12,
        end: 24
    },
    {
        day: 3,
        start: 12,
        end: 24
    },
    {
        day: 4,
        start: 12,
        end: 24
    },
    {
        day: 5,
        start: 0,
        end: 12
    },
    {
        day: 6,
        start: 4,
        end: 12
    }
]

const highLogs = [
    {
        day: 0,
        start: 14,
        end: 22
    },
    {
        day: 1,
        start: 0,
        end: 4
    },
    {
        day: 5,
        start: 16,
        end: 20
    },
    {
        day: 6,
        start: 0,
        end: 4
    },
    {
        day: 6,
        start: 16,
        end: 20
    }
]

const highRequests = [
    {
        day: 5,
        start: 14,
        end: 20
    },
    {
        day: 6,
        start: 10,
        end: 16
    },
    {
        day: 0,
        start: 20,
        end: 24
    },
]

function getRateClassification(date) {
    const weekday = date.getDay()
    const start = date.getHours()
    for (let i = 0; i < lowLogs.length; i++) {
        let lowRate = lowLogs[i]
        if (
            lowRate.day == weekday 
            && lowRate.start <= start
            && lowRate.end > start
        ) {
            return "LOW"        
        }
    }
    for (let i = 0; i < highLogs.length; i++) {
        let highRate = highLogs[i]
        if (
            highRate.day == weekday 
            && highRate.start <= start
            && highRate.end > start
        ) {
            return "HIGH"        
        }
    }
    return "MEDIUM"
}

function getRequestClassification(date) {
    const weekday = date.getDay()
    const start = date.getHours()
    for (let i = 0; i < highRequests.length; i++) {
        let highTime = highRequests[i]
        if (
            highTime.day == weekday 
            && highTime.start <= start
            && highTime.end > start
        ) {

            return "HIGH"        
        }

    }

    return "LOW"
}

module.exports = {
    lowLogs,
    highLogs,
    getRateClassification,
    getRequestClassification
}