const express = require('express')
const { createDevices } = require('../src/controller/device')
const { tokenMiddleware } = require('../src/middleware/tokenMiddleware')
const routes = express.Router()


routes.use(tokenMiddleware)

routes.post('/create', createDevices)


exports.routesDevices  = routes