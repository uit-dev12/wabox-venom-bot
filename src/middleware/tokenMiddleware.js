const { GetDevices } = require("../../utils/callApi")

exports.tokenMiddleware = async (req, res, next) => { 
    // check token 
    const token  = req.headers.token 
    if(!token || token.length === 0)  { 
        return res.status(400).json({status: false, message: "Token not found"})
    }
    // get devices 
    const getDevices = await  GetDevices(token)
    // check devices
    if(!getDevices) { 
        return res.status(400).json({status: false, message: "Token invalid"})
    }
    // set request users 
    req.user = JSON.parse(JSON.stringify(getDevices))
    return next()

}