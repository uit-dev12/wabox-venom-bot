const venom = require('venom-bot')
const { UpdateDevices } = require('../callApi')
const client_data = []

function start(client, tokens, data) {

  // push array clinet data 
  client_data.push({client: client, tokens: tokens})

  console.log('readdy')
  // get my profile 
  client.getHostDevice().then(result => { 
    // get phone number and check phone number 
    const phoneNumbers = result.id.user

    // check numbers phone 
    if(phoneNumbers == data.number_phone) { 
      console.log('samaa')
    } else { 
      // logout 
      client.logout();
    }
  
  }).catch(erro => { 
    console.log("error get profiles")
  })


  // check connections
  client.isConnected().then(result => { 
    console.log(result)
  }).catch(erro => { 
    console.log(erro)
  })


  UpdateDevices(tokens, 1)
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}


const generetDevice  = (sessionName, data) =>  { 
  
        venom
        .create({
        session: sessionName,  //name of session
        // logQR: true, 
        catchQR: (qrCode, asciiQR) => {
          console.log(qrCode)
          console.log('ak', asciiQR)

        }, 

        headless: true,

      
        })
        .then((client) => start(client, sessionName, data))
        .catch((erro) => {
          console.log(erro);
        });

}

exports.generetDevice = generetDevice
exports.client_data = client_data
exports.stars = start