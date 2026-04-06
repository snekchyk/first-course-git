import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";

const key = "123"

export const jwtService = {
    async createJWT(user: any) {
        const token = jwt.sign({userId: user._id}, key, {expiresIn: '1h'})
        return token
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, key)
            return new ObjectId(result.userId)
        } catch(err) {
            return null
        }
    }
}