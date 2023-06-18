const venom = require('venom-bot')
const { UpdateDevices } = require('../callApi')
const client_data = []

async function start(client, tokens, data) {
  // push array clinet data 
  client_data.push({client: client, tokens: tokens})
  // get my profile 
  const getDeveices = await client.getHostDevice()
  // get phone number and check phone number 
  const phoneNumbers = getDeveices.id.user
  // check numbers phone logout if != number phone 
  if(phoneNumbers != data.number_phone) { 
      client.logout();
  } 

// check connections
const disconnect   = await  client.isConnected()
// update devices is disconnect 
if(!disconnect) { 
  await UpdateDevices(tokens, 0)
}
// updating auth status devices 
  await UpdateDevices(tokens, 1)





  // replaying message 
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


const generetDevice  = (sessionName, data, io) =>  { 
  
      venom.create({
        session: sessionName,  //name of session
        // logQR: true, 
        catchQR: (qrCode, asciiQR) => {
          // emiting socket 
          io.emit('qr-', {qr: qrCode}) 
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