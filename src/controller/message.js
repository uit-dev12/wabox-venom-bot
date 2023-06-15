const { body } = require("express-validator");
const Joi = require("joi");
// const { client_data } = require("../../utils/waConnections/connections");
const fs = require('fs')


// validations send message 
exports.sendMessage = async(req, res) => { 

    // definsion validations 
    const schema = Joi.object({
        text: Joi.string().min(4).required(),
        phone: Joi.string().min(10).max(20).required(),
      });

      try {
          //   validation input in request body 
          const { error, value } = schema.validate(req.body);
            //   check validations 
          if (error) {
            return res.status(400).json({status: false,  error: error.details[0].message, message: "Error validation" });
        }

        // // finding client 
        // const getClient = client_data.find(client => client.tokens == req.headers.token )
        // // checking tokens
        // if(!client) { 
        //     return res.status(400).json({status: false, message: "Client is disconnect"});
        // }
        // // instace client 
        // const client  = getClient.client
        // // sending message 
        // await client.sendText(value.phone +'@c.us', value.text).then(result => { 
        //     // sucess sending 
        //     return res.json({status: true, message: "Sucess send message"})
        // }).catch(erro => { 
        //     //  erorr send message 
        //     return res.status(400).json({status: false, message: "Error send message"})
        // });

        return res.json({status: true, data: value})

      } catch(e) { 
        // error servers 
        return res.status(500).json({"status": false, "message": e.message});
      }

}


// validations send message 
exports.sendImage = async(req, res) => { 

    // definsion validations 
    const schema = Joi.object({
        text: Joi.string().min(4).required(),
        phone: Joi.string().min(10).max(20).required(),
        file: Joi.object({
          name: Joi.string().regex(/\.(jpg|png|jpeg)$/).required(),
          mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
        }).required(),

      });

      try {
          //   validation input in request body 
          const { error, value } = schema.validate(req.body);
            //   check validations 
          if (error) {
            return res.status(400).json({status: false,  error: error.details[0].message, message: "Error validation" });
        }

              // File is valid, move it to the public folder
        const file = req.files.file;
        const fileName = Date.now() + file.name;
        const uploadPath = path.join(__dirname, 'public', fileName);
        // uploaded 
        file.mv(uploadPath, (err) => {
          if (err) {
            return res.status(500).json({ status: false, message: 'Failed to move the file' });
          }
        });


        // // finding client 
        // const getClient = client_data.find(client => client.tokens == req.headers.token )
        // // checking tokens
        // if(!client) { 
        //     return res.status(400).json({status: false, message: "Client is disconnect"});
        // }
        // // instace client 
        // const client  = getClient.client
        // // sending image
        // await client.sendImage(value.phone +'@c.us', uploadPath ,fileName , value.text).then(result => { 
        //   // remove file 
        //     fs.unlink(uploadPath);
        //   // sucess sending 
        //   return res.json({status: true, message: "Sucess send Image"})
        // }).catch(erro => { 
        //   // remove file 
        //   fs.unlink(uploadPath);
        //     //  erorr send message 
        //     return res.status(400).json({status: false, message: "Error send message"})
        // });

        return res.json({status: true, data: value})

      } catch(e) { 
        // error servers 
        return res.status(500).json({"status": false, "message": e.message});
      }

}



