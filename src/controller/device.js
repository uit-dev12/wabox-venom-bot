const { generetDevice, client_data } = require("../../utils/waConnections/connections")
const fs  = require('fs')

exports.createDevices = async (req, res) => { 
    // check the headrs token 
    const tokens = req.headers.token 
    if(!tokens) { 
        return res.status(400).json({status: false, message: 'Token is not found'})
    }
    // check auth status 
    // const authStatus = req.user.auth_status
    if(authStatus) { 
        return res.status(400).json({status: false, message: "Device Is connected"})
    }
    // generet device     
    generetDevice(tokens, req.user, req.io);
    return res.json({status: true});

}




exports.getProfile = async(req, res) =>{

    try { 
        // get user 
        const phone = req.user.number_phone 
        // get clinet and get profile pic 
        const client = client_data.find(client => client.api_key == req.headers.token)
        const myProfile = await client.client.getProfilePicFromServer(phone+'@c.us')
        return res.json({'status': true, 'data_url': myProfile})

    }catch(e) { 
        return req.status(500).json({'status': false})
    }

}




exports.deleteSessionFolder = async(req, res) => { 

    try { 
        // get tokens 
        const token = req.headers.token 
        // remove session folder
        fs.removeSync(__dirname + '/tokens/'+token);
        return res.json({status: true, message: 'Sucess delete folder'});

    } catch(e) { 
        // errors 500 
        return res.status(500).json({status: false, 'message': 'Internal Server Error'});
    }


}