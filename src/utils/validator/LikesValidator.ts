import * as Joi from "joi"

const isLike = Joi.object({
    userLikeId: Joi.number().required(),
    threadsLikeId: Joi.number().required(),
    // users: Joi.number()
})

// const UpdateThreadsSchema = Joi.object({
//     content: Joi.string(),
//     image: Joi.string()
// })

export { isLike }