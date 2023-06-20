const { GetAllDevices, UpdateDevices } = require("../callApi")
const venom = require('venom-bot')
const { stars } = require("./connections")

const deviceRecornect = async(io) =>  { 

  // get all devices 
  const devices = await GetAllDevices()
  // lopps data 
  devices.map( async elem => { 
    // updating data with auth status 1 
    if(elem.auth_status == 1) { 
        await Recornect(elem.api_key, elem, io)
    }
  })
}





const Recornect  = async(sessionName, data, io) => { 
        venom
        .create({
        session: sessionName,  //name of session
        // logQR: true, 
        catchQR: (qrCode, asciiQR) => {

          console.log(qrCode)
          console.log('ak', asciiQR)

        }, 

        })
        .then((client) => stars(client, sessionName,data, io ))
        .catch((erro) => {
          console.log(erro);
        });
 }

 
 
 
 exports.deviceRecornect = deviceRecornect
