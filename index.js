const express = require('express')
const http	= require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
	  origin: '*', // Set the origin to your client application's URL
	  methods:"*",
	  allowedHeaders: '*', // Allow all headers
	  credentials: true // Enable CORS credentials if needed
}}
	);
const port = 8989
const bodyParser = require('body-parser')
const { messageRoutes } = require('./routes/messageRoutes')
const { routesDevices } = require('./routes/RoutesDevice');
const { deviceRecornect } = require('./utils/waConnections/reconct');


// cors options 

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


// socket middleware 

app.use((req, res, next) => { 
	req.io = io
	next()
})

// json parser 
app.use(bodyParser.json())
// message 
app.use('/api/v1/message', messageRoutes)
// devices 
app.use('/api/v1/device', routesDevices)
// html testing 
app.get('/', (req, res) => { 
	res.sendFile(__dirname + '/public/index.html')
})




io.on('connection', (socket) => {
	console.log('connected');
  });


server.listen(port, () => {
	// get recornect 
	deviceRecornect(io)
	console.log(`Server is running on port ${port}`);
  });