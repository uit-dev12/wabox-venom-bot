const { generetDevice } = require("../../utils/waConnections/connections")

exports.createDevices = async (req, res) => { 
    // check the headrs token 
    const tokens = req.headers.token 
    if(!tokens) { 
        return res.status(400).json({status: false, message: 'Token is not found'})
    }
    // check auth status 
    // const authStatus = req.user.auth_status
    // if(authStatus) { 
    //     return res.status(400).json({status: false, message: "Device Is connected"})
    // }
    // generet device     
    generetDevice(tokens, req.user);
    return res.json({status: true});

}

