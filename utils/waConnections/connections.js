const venom = require('venom-bot')
const { UpdateDevices } = require('../callApi')
const client_data = []

function start(client, tokens) {
  // push array clinet data 
  console.log('readdy')
  client_data.push({client: client, tokens: tokens})
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


const generetDevice  = (sessionName) =>  { 
        venom
        .create({
        session: sessionName //name of session
        })
        .then((client) => start(client, sessionName))
        .catch((erro) => {
          console.log(erro);
        });

}

exports.generetDevice = generetDevice
exports.client_data = client_data