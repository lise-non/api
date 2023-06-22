const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        
    password: Joi.string()
        .min(8)
        .pattern( new RegExp('/^\S*$/'))
        .required()
})

module.exports = schema