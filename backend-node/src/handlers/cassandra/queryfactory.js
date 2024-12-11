const { SpecialRequest } = require("../../model/m_request");
const { LogsTableUtils, TableUtils, SpecialRequestTableUtils, RequestTableUtils } = require("./tableutils")
const cassandra = require('cassandra-driver');


class QueryFactory {

    keyspace
    table_name

    constructor(keyspace, table_name) {
        this.keyspace = keyspace
        this.table_name = table_name
    }

    createKeyspaceQuery() {
        const start = "CREATE KEYSPACE IF NOT EXISTS "
        const end =  " WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '2' }"
        const query = start + this.keyspace + end
        return query
    }

    createTableQuery() {}
    insertItemQuery() {}
    insertItemValues() {}
    createSecondaryIndex(column) {
        return "CREATE INDEX ON " + this.keyspace + "." + this.table_name + " (" + column + ")"
    }

    deleteTable() {
        return "DROP TABLE IF EXISTS " + this.keyspace + "." + this.table_name
    }
}

class LogQueryFactory extends QueryFactory{

    createTableQuery() {
        //console.log('cassandra handler - log item table')
        let start = "CREATE TABLE IF NOT EXISTS " + this.keyspace + "." + this.table_name
        let ts_columns = " (ts timeuuid, "
        let customer_columns = "customer text, "
        let model_columns = "name text, version int, "
        let parameters_columns = "presence_penalty float, frequency_penalty float, temperature float, top_p float, "
        let relevation_columns = "generations int, satisfaction int, wli int, tokens int, "
        let primary_key = "PRIMARY KEY(ts))"
        const query = start + ts_columns + customer_columns + model_columns + parameters_columns + relevation_columns + primary_key
        console.log(query)
        return query
    }

    insertItemQuery(item) {
        //console.log("cassandra handler - insert log item")
        const utils = new LogsTableUtils()

        let columns_names = utils.getColumnNames(item)

        let start = "INSERT INTO " + this.keyspace + "." + this.table_name + " ("
        let columns = utils.getColumnsString(columns_names)
        let mid_query = " VALUES ("
        let end = utils.getQuestionMarks(columns_names)
        const query = start + columns + mid_query + end
        //console.log('query: ', query)

        return query
    }

    insertItemValues(item) {
        let values = [
            cassandra.types.TimeUuid.fromDate(item.timestamp),
            item.customer,
            item.model.name, item.model.version,
            item.relevations.generations, item.relevations.satisfaction,
            item.relevations.wli, item.relevations.tokens
        ]
        let parameters = Object.values(item.parameters)
        return values.concat(parameters)
    }

    basicquery(field1, field2, model) {
        let basicQuery = "SELECT " + field1 + ", " +  field2 + " FROM " + this.keyspace + "." + this.table_name
        let whereSection = ""

        let whereClauses = []
        if (field2 === "temperature" || field2 === "presence_penalty") {
            whereClauses.push(field2 + " > 0.001")
        }
        if (model !== "all") {
            whereClauses.push("name = '" + model + "'")
        }
        if (whereClauses.length > 0) {
            whereSection = " WHERE " + whereClauses[0]
        }
        if (whereClauses.length === 2) {
            whereSection = whereSection + " AND " + whereClauses[1]
        }
        if (whereSection !== "") {
            whereSection = whereSection + " ALLOW FILTERING"
        }
        return basicQuery + whereSection
    }
}
    
class RequestQueryFactory extends QueryFactory {
    createTableQuery() {
        //console.log('cassandra handler - log item table')
        let start = "CREATE TABLE IF NOT EXISTS " + this.keyspace + "." + this.table_name
        let ts_columns = " (ts timeuuid, "
        let request_columns = "input_tokens int, total_tokens int, stream_messages int, loading_time int, input_dimension int, "
        let primary_key = "PRIMARY KEY(ts))"
        const query = start + ts_columns + request_columns + primary_key
        console.log(query)
        return query
    }

    insertItemQuery(item) {
        //console.log("cassandra handler - insert request item: ", item)
        
        let utils = new TableUtils()
        if (item instanceof SpecialRequest) {
            utils = new SpecialRequestTableUtils()
        } else {
            utils = new RequestTableUtils()
        }
        let columns_names = utils.getColumnNames(item)
        //console.log("cassandra handler - insert request columns_names: ", columns_names)


        let start = "INSERT INTO " + this.keyspace + "." + this.table_name + " ("
        let columns = utils.getColumnsString(columns_names)
        let mid_query = " VALUES ("
        let end = utils.getQuestionMarks(columns_names)
        const query = start + columns + mid_query + end
        //console.log('query: ', query)

        //console.log('time: ', ts)
        return query
    }

    insertItemValues(item) {
        let values = [
            cassandra.types.TimeUuid.fromDate(item.timestamp),
            item.input_tokens,
            item.total_tokens,
            item.stream_messages,
            item.loading_time
        ]
        if (item instanceof SpecialRequest) {
            values.push(item.input_dimension)
        }
        return values
    }

    basicQuery(field) {
        let basicQuery = ""
        console.log(field)
        if (field !== "time") {
            basicQuery = "SELECT loading_time, " +  field + " FROM " + this.keyspace + "." + this.table_name
        } else basicQuery = "SELECT loading_time, DateOf(ts) FROM " + this.keyspace + "." + this.table_name
        let whereSection = ""

        let whereClauses = []
        if (field === "input_dimension") {
            whereClauses.push(field + " > 0")
        }
        if (whereClauses.length > 0) {
            whereSection = " WHERE " + whereClauses[0]
        }
        if (whereClauses.length === 2) {
            whereSection = whereSection + " AND " + whereClauses[1]
        }
        if (whereSection !== "") {
            whereSection = whereSection + " ALLOW FILTERING"
        }
        return basicQuery + whereSection
    }
}



module.exports = {
    QueryFactory,
    LogQueryFactory,
    RequestQueryFactory
}