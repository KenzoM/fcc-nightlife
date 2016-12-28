const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = process.env.PORT || 1234;
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');

//MAKE SURE TO HAVE MONGOD and YOUR DB SETUP!!
const db =  process.env.MONGODB_URI || "mongodb://localhost:whatever/whatever";

const config = require('../../webpack.config');
const webpack = require('webpack');
const compiler = webpack(config);

const cors = require('cors')

//DB Setup
mongoose.connect(db);

app.use(cors()) //CORS middleware on express side

¸
//App Setup
app.use(morgan('combined'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


router(app);


//Server Setup(Express)
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`)
})
