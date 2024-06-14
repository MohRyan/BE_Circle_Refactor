import db from "../db"

// // service for logic when app comunication to database
// import dataSource from "../dataSource"
// import Users from "../entities/User.entity"
// import { FormUsers } from "../interfaces"

// export default new (class UserService {
//   repositoryUsers = dataSource.getRepository(Users)

//   // ================== Get Data Users ===================
//   async getUser(email: string): Promise<any> {
//     try {
//       const response = await dataSource
//         .getRepository(Users)
//         .findOne({ where: { email } })

//       return response
//     } catch (error) {
//       throw error
//     }
//   }

//   // ==== Get All Data Users
export const getUsers = async () => {
    return await db.user.findMany({
        include: {
            profile: true,
            _count: true
            // thread: true

        }
    })
}
//   async find(): Promise<any> {
//     try {
//       // const users = await dataSource
//       //   .getRepository(Users)
//       //   .createQueryBuilder("users")
//       //   .leftJoinAndSelect("users.threads", "threads")
//       //   .getMany()
//       const users = await this.repositoryUsers.find({
//         relations: {
//           threads: true,
//           likes: true,
//           replies: true,
//           followerId: true,
//           followedId: true
//         },
//       })

//       // const dataUsers = await this.repositoryUsers.save(users)
//       return users
//     } catch (error) {
//       throw error
//     }
//   }


// Get User By ID
export const getUser = async (id: number) => {
    return await db.user.findMany({
        where: {
            id: id
        },
        include: {
            profile: true,
            thread: {
                include: {
                    image: {
                        select: {
                            image: true
                        }
                    }
                }
            },
            _count: true
        }
    })

}

//   async findUsersWithId(id: number): Promise<any> {
//     try {
//       const users = await this.repositoryUsers.find({
//         relations: {
//           threads: true,
//           likes: true,
//           replies: true,
//           followerId: true,
//           followedId: true
//         },
//       })
//       const userID = users.filter(item => {
//         if (item.id == id) {
//           return item
//         }
//       })
//       return userID
//     } catch (error) {
//       throw error
//     }
//   }

//   async findwithLimit(id: number): Promise<any> {
//     try {
//       const users = await dataSource
//         .getRepository(Users)
//         .createQueryBuilder("users")
//         .limit(id)
//         .getMany()

//       return users
//     } catch (error) {
//       throw error
//     }
//   }
//   // ==== Get All Data User
//   async findUser(): Promise<any> {
//     try {
//       const users = await dataSource
//         .getRepository(Users)
//         .createQueryBuilder("users")
//         .getMany()

//       // const user = users.filter(item => {
//       //   if (item.role == "user") {
//       //     // console.log(item)
//       //     return item
//       //   }
//       // })
//       // return user
//     } catch (error) {
//       throw error
//     }
//   }
//   // ==== Get All Data Admin
//   async findAdmin(): Promise<any> {
//     try {
//       const users = await dataSource
//         .getRepository(Users)
//         .createQueryBuilder("users")
//         .getMany()

//       // const admin = users.filter(item => {
//       //   if (item.role == "admin") {
//       //     return item
//       //   }
//       // })
//       // const admin = users.filter(item => {
//       //   if (item.role == "admin") {
//       //     return item
//       //   }
//       // })
//       // return admin
//     } catch (error) {
//       throw error
//     }
//   }
//   // async findAdminWithId(id: number): Promise<any> {
//   //   try {
//   //     const users = await dataSource
//   //       .getRepository(Users)
//   //       .createQueryBuilder("users")
//   //       .getMany()

//   //     const admin = users.filter(item => {
//   //       if (item.id == id) {
//   //         return item
//   //       }
//   //     })
//   //     return admin
//   //   } catch (error) {
//   //     throw error
//   //   }
//   // }

//   // ================== Delete Data Users ===================

//   async delete(id: number): Promise<any> {
//     try {

//       const userToDelete = await this.repositoryUsers.findOne({
//         where: { id },
//       })

//       if (!userToDelete) {
//         throw new Error("User not found")
//       }

//       await this.repositoryUsers.remove(userToDelete)

//       await dataSource
//         .createQueryBuilder()
//         .delete()
//         .from(Users)
//         .where(userToDelete)
//         .execute()

//       return userToDelete
//     } catch (error) {
//       throw error
//     }
//   }

//   // ================== Update Data Users ===================

//   async update(id: number, newData: any): Promise<any> {
//     try {
//       const userUpdate = await this.repositoryUsers.findOne({
//         where: { id },
//       })

//       if (!userUpdate) {
//         throw new Error("User not found")
//       }

//       Object.assign(userUpdate, newData)

//       // console.log("🚀 ~ UserService ~ update ~ newData:", newData)
//       const UpdateUser = await this.repositoryUsers.save(userUpdate)

//       return UpdateUser
//     } catch (error) {
//       throw error
//     }
//   }

//   async findShowPassUser(): Promise<any> {
//     try {


//       const users = await this.repositoryUsers.find({
//         select: {
//           full_name: true,
//           email: true,
//           password: true
//         },

//       })

//       return users
//     } catch (error) {
//       throw error
//     }
//   }
// }
// )