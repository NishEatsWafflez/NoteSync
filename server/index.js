const express = require('express');
require("dotenv").config();
const Router = require('./routes/record');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose')
const url = process.env.ATLAS_URI
// const connectionParams={
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// }
mongoose.connect(url)
  .then( () => {
      console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  })
const app = express();
app.use(cors({origin: '*'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});
app.use(bodyParser.json());
app.use('/api/routes', Router);
const http = require('http');
const server = http.createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });
// const io = socket(server);

// io.on('connection', onConnection);

// function onConnection(socket){
//   socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
// }

const port = 8080;
server.listen(port, () => console.log(`server is running on port ${port}`));