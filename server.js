const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require('mongoose');
const app = express();
const port = 25001;
const appname = `mongo-app`

const Routers = require('./routes/routes.js');
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

mongoose.connect(`${MONGO_URL}${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err) =>{
    if (err) {
      console.error("mongodb connection error", err);
    }
    console.log("mongodb connected");
})

app.use('/api', Routers);

app.use((req, res, next) => {
    res.status(404).send('Not found')
})

app.use((error,req, res, next) => {
    console.log(error);
    res.status(500).send('internal server Error')
})
app.listen(port,() =>{
  console.log(`${port} ${appname} listening`);
})