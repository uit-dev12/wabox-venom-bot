const ipware = require("ipware");
const { GetDevices } = require("../../utils/callApi");
getIP = ipware().get_ip
require('dotenv').config();

exports.whiteListIP = (req, res, next) => {
    // get devices
    GetDevices(req.headers.token).then(response_data => {
        let myip = getIP(req);
        let data_ip = null;
        let list_ip = String(response_data.whitelist_ip).split(',')
        // 
        list_ip.forEach(ip => {
            if (ip == myip.clientIp) {
                data_ip = ip
            }
        })
        // ip is not whitelist 
        if (data_ip != myip.clientIp) {
            return res.jsonp({ 'status': false, "msg": 'Unauthorized IP (' + myip.clientIp + ')  Please add this IP to your Whitelist IP' })
        }
        return next()
    })
}

