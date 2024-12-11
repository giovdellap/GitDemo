var express = require('express');
const cors = require('cors');

const insertionRouter = require("./routes/r_insertion.js");
const queryRouter = require('./routes/r_query.js');
// const insertionRouter = require("./routes/r_insertion")

const app = express();

app.use(express.json())
app.use(express.urlencoded())
const PORT = 5001;

app.use(cors())
//app.use(bodyParser.urlencoded({ extended: false }));
app.use('/insertion', insertionRouter);
app.use('/query', queryRouter);

app.listen(PORT, console.log('Server is running on port: ' + PORT));