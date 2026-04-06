import {feedbacksRepository} from "../repositories/feedbacks-repository.js";

export const feedBacksService = {
    async sendFeedBack(comment: string, userId: string) {
        const commentObject = {
            comment: comment,
            userId: userId
        }
        return feedbacksRepository.createFeedBack(commentObject)
    },
    async getAllFeedBacks(){
        return await feedbacksRepository.getAllFeedBacks()
    }
}