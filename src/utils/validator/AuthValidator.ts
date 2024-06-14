import * as Joi from "joi"

const registerSchema = Joi.object({
    username: Joi.string().min(8).required(),
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // bio: Joi.string().allow(true),
    // profile_picture: Joi.string().allow(true),
    // profile_description: Joi.string().allow(true)
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export { registerSchema, loginSchema }