import * as Joi from "joi"

const isReplies = Joi.object({
    content: Joi.string().required(),
    userRepliesId: Joi.number().required(),
    threadsRepliesId: Joi.number().required(),
    // users: Joi.number()
})


export { isReplies }