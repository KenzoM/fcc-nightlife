const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = process.env.PORT || 1234;
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');

//MAKE SURE TO HAVE MONGOD and YOUR DB SETUP!!
const db =  process.env.MONGODB_URI || "mongodb://localhost:nightapp/nightapp";

const config = require('../../webpack.config');
const webpack = require('webpack');
const compiler = webpack(config);

const cors = require('cors')

//DB Setup
mongoose.connect(db);

app.use(cors()) //CORS middleware on express side

app.use('/index.html', express.static(path.join(__dirname, '../../index.html')))
app.use('/dist/bundle.js/', express.static(path.resolve(__dirname, '../../dist/bundle.js')))

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));
//
app.use(require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr',
}));

app.use('/yelp/:city', function(req, res, next){
  console.log('TEST BBABY~~~~')
  console.log(req.params.city)
  next()
})

//App Setup
app.use(morgan('combined'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


router(app);


//Server Setup(Express)
app.listen(port,()=>{
  console.log(`Server is listening on ${port}`)
})
