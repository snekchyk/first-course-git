import express from 'express';
import { HTTP_STATUSES } from "./courses.js";
export const getTestsRouter = (db) => {
    const router = express.Router();
    router.delete('/clear', (req, res) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    return router;
};
//# sourceMappingURL=tests.js.map