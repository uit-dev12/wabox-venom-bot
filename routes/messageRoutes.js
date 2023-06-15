const express = require('express')
const fileUpload = require('express-fileupload')
const { sendMessage } = require('../src/controller/message')
const { tokenMiddleware } = require('../src/middleware/tokenMiddleware')
const { whiteListIP } = require('../src/middleware/whiteListIpMiddleware')
const routes = express.Router()
// set middleware
// routes.use(tokenMiddleware)
// white list ip
// routes.use(whiteListIP)
// file upload 
routes.use(fileUpload())

routes.post('/send', sendMessage);


exports.messageRoutes = routes