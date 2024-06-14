import * as Joi from "joi"

const isFollows = Joi.object({
    user_follow: Joi.boolean(),
    // full_name: Joi.string().allow(true),
    // username: Joi.string().allow(true),
    userFollowed_Id: Joi.number().allow(true),
    userFollower_Id: Joi.number().allow(true),

    // users: Joi.number()
})

// const UpdateThreadsSchema = Joi.object({
//     content: Joi.string(),
//     image: Joi.string()
// })

export { isFollows }