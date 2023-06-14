import express from 'express'
import { createDevices } from '../src/controller/device'
// generet routes 
const routes =express.Router()
routes.get('/generetDevice',   createDevices)
// device routes 

module.exports = {
    routes
}