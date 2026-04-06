import {db} from './db.js'

export const feedbacksRepository = {
    async createFeedBack(comment: object) {
        await db.collection("feedbacks").insertOne(comment)
        return comment
    },
    async getAllFeedBacks() {
        return await db.collection("feedbacks").find({}).toArray()
    }
}