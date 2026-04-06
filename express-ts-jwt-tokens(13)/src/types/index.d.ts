import { UserDBType } from '../domains/users-service.js' // Укажи правильный путь к своему типу

declare global {
    namespace Express {
        export interface Request {
            user: UserDBType | null
        }
    }
}