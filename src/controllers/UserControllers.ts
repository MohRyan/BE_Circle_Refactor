import { Request, Response } from "express";
import * as users from "../services/UserServices"
// import UserServices from "../services/UserServices";
// import * as bcrypt from "bcrypt";


// export default new class UserControllers {
//   // ====================  Post User ======================
//   // async create(req: Request, res: Response): Promise<Response> {
//   //   try {
//   //     const data = req.body

//   //     const user = await UserServices.create(data)

//   //     return res.status(200).json(user)
//   //   } catch (error) {
//   //     return res.status(500).json({ message: error })
//   //   }
//   // }

//   // ====================  Get User ======================
export const getAllUser = async (req: Request, res: Response) => {
    const user = await users.getUsers()
    res.json({
        status: true,
        message: "success",
        data: user
    })
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await users.getUser(+id)
    res.json({
        status: true,
        message: "success",
        data: user
    })
}
//   async find(req: Request, res: Response): Promise<Response> {
//     try {
//       const users = await UserServices.find()

//       return res.status(200).json(users)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }

//   async findUsersWithId(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)
//       const users = await UserServices.findUsersWithId(id)

//       return res.status(200).json(users)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }

//   async findWithLimit(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)
//       const users = await UserServices.findwithLimit(id)

//       return res.status(200).json(users)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }
//   async findUser(req: Request, res: Response): Promise<Response> {
//     try {
//       const user = await UserServices.findUser()

//       return res.status(200).json(user)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }
//   async findAdmin(req: Request, res: Response): Promise<Response> {
//     try {
//       const admin = await UserServices.findAdmin()

//       return res.status(200).json(admin)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }
//   // async findAdminWithId(req: Request, res: Response): Promise<Response> {
//   //   try {
//   //     const user_id = parseInt(req.params.id)
//   //     const admin = await UserServices.findAdminWithId(user_id)

//   //     return res.status(200).json(admin)
//   //   } catch (error) {
//   //     return res.status(500).json({ message: error })
//   //   }
//   // }

//   // async login(req: Request, res: Response): Promise<Response> {
//   //   try {
//   //     const data = req.body

//   //     // if (!username || !password) {
//   //     //   return res.status(500).json({ message: "Invalid Username or password" })
//   //     // }

//   //     // const userLogin = await UserServices.login(username, password)
//   //     const userLogin = await UserServices.login(data)

//   //     return res.status(200).json(userLogin)
//   //   } catch (error) {
//   //     return res.status(500).json({ message: error })
//   //   }
//   // }

//   // ====================  Delete User ======================
//   async delete(req: Request, res: Response): Promise<Response> {
//     try {
//       const user_id = parseInt(req.params.id)
//       const deleteUser = await UserServices.delete(user_id)

//       return res.status(200).json(deleteUser)
//     } catch (error) {
//       return res.status(500).json({ message: "Error Delete" })
//     }
//   }

//   // ====================  Update User ======================
//   async update(req: Request, res: Response): Promise<Response> {
//     try {
//       const user_id = parseInt(req.params.id)
//       const data = res.locals.filename

//       const newData = {
//         ...req.body,
//         profile_picture: data[0].filename,
//         profile_description: data[1].filename,
//       }
//       const updateUser = await UserServices.update(user_id, newData)

//       return res.status(200).json({ data: updateUser, message: "Update Success!!" })
//     } catch (error) {
//       return res.status(500).json({ message: "Error Update" })
//     }
//   }

//   async findShowPassUser(req: Request, res: Response): Promise<Response> {
//     try {
//       const users = await UserServices.findShowPassUser()
//       // const pass = users.map((item: any) => item.password)
//       // const compareUsers = await bcrypt.compare(pass.map((item: any) => item), pass.map((item: any) => item))
//       // console.log("🚀 ~ UserControllers ~ findShowPassUser ~ compareUsers:", compareUsers)

//       // console.log("🚀 ~ UserControllers ~ findShowPassUser ~ compareUsers:", compareUsers)

//       return res.status(200).json(users)
//     } catch (error) {
//       return res.status(500).json({ message: error })
//     }
//   }
// }