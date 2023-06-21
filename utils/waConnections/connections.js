const venom = require('venom-bot')
const { UpdateDevices } = require('../callApi')
const client_data = []
const fs = require('fs')

async function start(client, tokens, data, io) {

  try { 
      // push array clinet data 
      client_data.push({client: client, tokens: tokens})
      // socket send 
      io.emit('status-'+tokens, {code: 200});
      io.emit('status-'+data.id, {code: 200});
    
      // get phone number and check phone number 
      const getDeveices = await client.getHostDevice()
      const phoneNumbers = getDeveices.id.user
      console.log(phoneNumbers);
    
      // check numbers phone logout if != number phone 
      if(phoneNumbers != data.number_phone) { 
        // close and remove token 
          await client.close()
          fs.rmdirSync(__dirname + '/tokens/'+tokens);
      } 
    
    // check connections and update devices is disconnect 
    const disconnect   = await  client.isConnected()
    if(!disconnect) { 
      await UpdateDevices(tokens, 0)
    }
    // update devices connected 
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

  } catch(e) { 
    // erros 
    io.emit('status-'+tokens, {code: 500});
    UpdateDevices(tokens, 0)
    console.log(e)


  }
}


const generetDevice  = (sessionName, data, io) =>  { 
  
      venom.create({
        session: sessionName,  //name of session
        // logQR: true, 
        catchQR: (qrCode, asciiQR) => {
          // emiting socket   
          io.emit('qr-'+sessionName, {qr: qrCode}) 
        }, 
        headless: true,
        })

        .then((client) => start(client, sessionName, data, io))
        .catch((erro) => {
          console.log(erro);
        });


}

exports.generetDevice = generetDevice
exports.client_data = client_data
exports.stars = start