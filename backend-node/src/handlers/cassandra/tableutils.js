class TableUtils {

    tableColumns = []

    getColumnNames(item) {
        return this.tableColumns
    }
    
    //returns a string defining the columns
    getColumnsString(values) {
        let str = ""
        for (let i = 0; i < values.length - 1; i++) {
            str = str + values[i] + ", "
        }
        str = str + values[values.length - 1] + ")"
        return str
    }

    //returns a string containing the question marks
    getQuestionMarks(values) {
        //console.log('get question marks - values: ', values)
        let str = ""
        for (let i = 0; i < values.length - 1; i++) {
            str = str + "?, "
        }
        str = str + "?)"
        return str
    }

}

class LogsTableUtils extends TableUtils {

    getColumnNames(item) {
        let values = [
            "ts", 
            "customer", 
            "name", "version",
            "generations", "satisfaction", "wli", "tokens"
        ]
        let parameters = Object.keys(item.parameters)
        return values.concat(parameters)
    }
}

class RequestTableUtils extends TableUtils {

    tableColumns = [
    "ts", "input_tokens", "total_tokens", "stream_messages", "loading_time"
    ]
}

class SpecialRequestTableUtils extends TableUtils {

    tableColumns = [
    "ts", "input_tokens", "total_tokens", "stream_messages", "loading_time", "input_dimension"
    ]
}

// returns an array containing the values of the parameters
function getParametersValues(parameters) {
    let keys = Object.keys(parameters)
    let values = []
    for (let i = 0; i < keys.length; i++) {
        values.push(parameters[keys[i]])
    }
    return values
}



module.exports = {
    getParametersValues,
    TableUtils,
    LogsTableUtils,
    RequestTableUtils,
    SpecialRequestTableUtils
}