var express = require('express');
const insertionController = require("../controllers/c_insertion")

const insertionRouter = express.Router();
insertionRouter.post('/insertLogs', insertionController.insertLogs);
insertionRouter.post('/insertOneDay', insertionController.insertOneDay);
insertionRouter.post('/insertOneMonth', insertionController.insertOneMonth);

insertionRouter.post('/initializeDB', insertionController.initializeDB)
insertionRouter.post('/setupBothDB', insertionController.setupBothDB)

module.exports = insertionRouter;