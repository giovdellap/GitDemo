class InfluxQueryFactory {

    bucket
    constructor(bucket_name) {
        this.bucket = bucket_name
    }

    getBasicQuery(field1, model ) {

        let filters = [
            this.getFilterQuery('_measurement', 'logItem'),
            this.getFilterQuery('_field', field1),
        ]
        if (model !== 'all') {
            filters.push(this.getFilterQuery('model', model))
        }
        return this.getQuery(filters)

    }

    getFilterQuery(tag, argument) {
        return 'r.' + tag + ' == "' + argument + '"'
    }

    getRequestQuery() {

        let filters = [
            this.getFilterQuery('_measurement', 'request'),
            this.getFilterQuery('_field', "loading_time"),
        ]
        return this.getQuery(filters)
    }

    getQuery(filters) {
        const bucket_query = 'from(bucket:"' + this.bucket + '") '
        const range_query = '|> range(start: 2024-01-01T00:01:00Z, stop: 2024-12-31T23:59:00Z) '
        const filter_start = '|> filter(fn: (r) => '
        const filter_end = ')'
        const filter_conjunction = ' and '
        let filter_query = filter_start + filters[0]
        for (let i = 1; i < filters.length; i++) {
            filter_query = filter_query + filter_conjunction + filters[i]
        } 
        filter_query = filter_query + filter_end

        return bucket_query + range_query + filter_query
    }
}



module.exports = {
    InfluxQueryFactory
}