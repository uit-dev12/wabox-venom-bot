const { generetDevice } = require("../../utils/waConnections/connections")

exports.createDevices = async (req, res) => { 
    // check the headrs token 
    const tokens = req.headers.token 
    if(!tokens) { 
        return res.status(400).json({status: false, message: 'Token is not found'})
    }
    // generet device 
        generetDevice(tokens)
}

