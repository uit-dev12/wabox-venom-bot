const express = require('express')
const { sendMessage } = require('../src/controller/message')
const { tokenMiddleware } = require('../src/middleware/tokenMiddleware')
const routes = express.Router()
// set middleware
routes.use(tokenMiddleware)
// 
routes.post('/send', sendMessage);


exports.messageRoutes = routes