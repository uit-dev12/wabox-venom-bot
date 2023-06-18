const express = require('express')
// const { createDevices } = require('./src/controller/device')
// const { client_data } = require('./utils/waConnections/connections')


const app = express()
const port = 8989
const bodyParser = require('body-parser')
const { messageRoutes } = require('./routes/messageRoutes')
const { routesDevices } = require('./routes/RoutesDevice')
const { deviceRecornect } = require('./utils/waConnections/reconct')
app.use(bodyParser.json())

// message 
app.use('/api/v1/message', messageRoutes)
app.use('/api/v1/device', routesDevices)


app.listen(port, () => {
	deviceRecornect()
	console.log(`Server running in port ${port}`)
})
