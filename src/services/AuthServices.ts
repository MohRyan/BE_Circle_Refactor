import db from "../db"
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
// import dataSource from "../dataSource";
// import Users from "../entities/User.entity";
import { FormUsers } from "../interfaces";
import { registerSchema } from "../utils/validator/AuthValidator";
import 'dotenv/config'


// export default new (class AuthService {
//     repositoryUsers = dataSource.getRepository(Users)

// Register Users
// Validate ada di controller untuk TypeOrm
// Hash Password ada di controller untuk TypeOrm
export const register = async (payload: FormUsers) => {
    const { error, value } = registerSchema.validate(payload)
    if (error) { throw Error(`${error.details[0].message} / Tidak Boleh Kosong`) }

    // untuk pengecekan user lewat register bahwa user sudah terdaftar
    const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username
                },
                {
                    email: value.email
                }
            ]
        }
    })

    if (isExist) {
        throw new Error("Username or Email already Exist")
    }

    // untuk hash password dari form register
    const hashPass = await bcrypt.hash(value.password, 10)

    value.password = hashPass

    // untuk memasukkan data ke database lewat prisma orm
    const user = await db.user.create({
        data: {
            ...value
        }
    })
    console.log(user)
    // PROFILE
    const profile = await db.profile.create({
        data: {
            userId: user.id
        }
    })

    return { user, profile }
    // return user
}

// Login dengan orm Prisma
// bisa login dengan username ataupun email namun masih tetep pake username (dalam form nya)
export const login = async (username: string, password: string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    username
                },
                {
                    email: username
                }
            ]
        }
    })

    // pengecekan user dalam login...
    if (!user) {
        throw new Error("User not Found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Password is wrong")
    }


    // penggunaan jwt 

    const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY), { expiresIn: "1d" })
    return token
}


//     // async login(username: string, password: string): Promise<any> {
//     async login(reqBody: any): Promise<any> {
//         try {
//             const checkUser = await dataSource
//                 .getRepository(Users)
//                 .createQueryBuilder("users")
//                 .where("users.username = :username", { username: reqBody.username })
//                 .addSelect("users.password")
//                 .getOne()

//             if (!checkUser) {
//                 return `message: ${reqBody.username} not found`;
//             }

//             return checkUser

//         } catch (error) {
//             throw error
//         }
//     }

export const checkWhoLogin = async (reqBody: any) => {
    try {
        const dataToken = reqBody.id
        const user = await db.user.findFirst({
            where: {
                id: dataToken
            },

        })

        return user
    } catch (error) {
        throw error
    }
}

//     async checkWhoLogin(reqBody: any): Promise<any> {
//         try {
//             const dataToken = reqBody
//             return dataToken
//         } catch (error) {
//             throw error
//         }
//     }

// })
