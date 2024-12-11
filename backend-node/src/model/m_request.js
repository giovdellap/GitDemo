class Request {
    input_tokens = 0
    total_tokens = 0
    timestamp = {}
    stream_messages = 0
    loading_time = 0


    constructor(
        input_tokens, 
        total_tokens, 
        timestamp,
        loading_time,
        stream_messages,
    ) {
        this.input_tokens = input_tokens
        this.total_tokens = total_tokens
        this.timestamp = timestamp
        this.stream_messages = stream_messages
        this.loading_time = loading_time
    }
}

class SpecialRequest extends Request {
    input_dimension = 0
    
    constructor(
        input_tokens, 
        total_tokens, 
        timestamp, 
        loading_time,
        stream_messages,
        input_dimension
    ) {
        super(
            input_tokens, total_tokens, timestamp,
            loading_time, stream_messages
        )

        this.input_dimension = input_dimension
    }
}

module.exports = {
    Request,
    SpecialRequest
}