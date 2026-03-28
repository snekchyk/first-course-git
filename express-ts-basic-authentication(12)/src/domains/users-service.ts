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

        console.log(password)
        console.log(passwordSalt)
        console.log(passwordHash)
        console.log(newUser)
        return usersRepository.createUser(newUser)
    },
    async checkCredentials(login: string, password: string): Promise<boolean> {
        const user = await usersRepository.findUserByLogin(login)

        if (!user) return false

        const passwordHash = await this._hashingPassword(password, user.salt)

        return user.hash === passwordHash

    },
    async _hashingPassword(password: string, passwordSalt: string): Promise<string> {
        return await bcrypt.hash(password, passwordSalt)
    }
}