const express = require('express')
// const { createDevices } = require('./src/controller/device')
const { client_data } = require('./utils/waConnections/connections')
const app = express()
const port = 3000 
const bodyParser = require('body-parser')
const { messageRoutes } = require('./routes/messageRoutes')
app.use(bodyParser.json())

app.use('/api/v1/message', messageRoutes)

app.listen(port, () => {
	console.log(`Server running in port ${port}`)
})
