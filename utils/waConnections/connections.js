const venom = require('venom-bot')
const client_data = []

venom
  .create({
    session: 'my-sessions' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  // push array clinet data 
  client_data.push({client: client, session_name: 'my-sessions' })

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




const generetDevice  = sessions_name =>  { 

        venom
        .create({
        session: sessions_name //name of session
        })
        .then((client) => start(client))
        .catch((erro) => {
          console.log(erro);
        });

}

exports.generetDevice = generetDevice
exports.client_data = client_data