import * as Joi from "joi"

const createThreadSchema = Joi.object({
    content: Joi.string(),
    // image: Joi.string().required(),
    image: Joi.string().allow(true),
    idUsers: Joi.number()
})

// const UpdateThreadsSchema = Joi.object({
//     content: Joi.string(),
//     image: Joi.string()
// })

export { createThreadSchema }