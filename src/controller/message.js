const Joi = require("joi");


// validations send message 
exports.sendMessage = async(req, res) => { 

    // definsion validations 
    const schema = Joi.object({
        text: Joi.string().min(4).required(),
        phone: Joi.number().min(10).max(20).required(),
      });

      try {
          //   validation input in request body 
          const { error, value } = schema.validate(req.body);
            //   check validations 
          if (error) {
            return res.status(400).json({status: false,  error: error.details[0].message, message: "Error validation" });
        }
        // sending message 
        return res.json(value)

      } catch(e) { 
        // error servers 
        return res.status(500).json({"status": false, "message": "Internal Server Error"});
      }

}



