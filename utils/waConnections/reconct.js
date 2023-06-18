const { GetAllDevices, UpdateDevices } = require("../callApi")
const venom = require('venom-bot')
const { stars } = require("./connections")

const deviceRecornect = async() =>  { 

  // get all devices 
  const devices = await GetAllDevices()
  // lopps data 
  devices.map( async elem => { 
    // updating data with auth status 1 
    if(elem.auth_status == 1) { 
        await Recornect(elem.api_key, elem)
    }
  })
}





const Recornect  = async(sessionName, data) => { 
        venom
        .create({
        session: sessionName,  //name of session
        // logQR: true, 
        catchQR: (qrCode, asciiQR) => {

          console.log(qrCode)
          console.log('ak', asciiQR)

        }, 

        })
        .then((client) => stars(client, sessionName,data ))
        .catch((erro) => {
          console.log(erro);
        });
 }

 
 
 
 exports.deviceRecornect = deviceRecornect
