class DBHandler {
          
    client = {}
    
    constructor() {}

    async initialize() {}

    async insertMultipleItems(type, items) {}

    async insertLogItem(item) {}
  
    async insertRequestItem(item) {}

    async basicQuery(field1, field2, model) {}

    async basicRequestQuery(field) {}
  }
  
  
  
  module.exports = {
    DBHandler
  }