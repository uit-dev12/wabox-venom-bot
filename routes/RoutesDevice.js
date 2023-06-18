const express = require('express')
const { createDevices, getProfile } = require('../src/controller/device')
const { tokenMiddleware } = require('../src/middleware/tokenMiddleware')
const routes = express.Router()


routes.use(tokenMiddleware)

routes.post('/create', createDevices)
routes.get('/profile', getProfile)


exports.routesDevices  = routes