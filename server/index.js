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
const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
}
app.use(cors(corsOptions));
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