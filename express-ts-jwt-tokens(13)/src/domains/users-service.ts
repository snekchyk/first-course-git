import { usersRepository } from "../repositories/users-repository.js"
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'

export const userService = {
    async createUser(login: string, password: string): Promise<boolean> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._hashingPassword(password, passwordSalt)

        const newUser = {
            _id: new ObjectId,
            username: login,
            salt: passwordSalt,
            hash: passwordHash
        }
        return usersRepository.createUser(newUser)
    },
    async checkCredentials(login: string, password: string): Promise<any> {
        console.log(2 + login + password)
        const user = await usersRepository.findUserByLogin(login)

        if (!user) return false

        const passwordHash = await this._hashingPassword(password, user.salt)

       if (user.hash === passwordHash) {
           return user
       }

    },
    async getUserById(userId: any) {
        return usersRepository.findUserById(userId)

    },
    async _hashingPassword(password: string, passwordSalt: string): Promise<string> {
        return await bcrypt.hash(password, passwordSalt)
    }
}